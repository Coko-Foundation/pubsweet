const {
  jobs: { connectToJobQueue },
} = require('pubsweet-server')

const { getPubsub } = require('pubsweet-server/src/graphql/pubsub')
const { db } = require('@pubsweet/db-manager')

const logger = require('@pubsweet/logger')

const DOCX_TO_HTML = 'DOCX_TO_HTML'
const crypto = require('crypto')
const waait = require('waait')

const resolvers = {
  Mutation: {
    createDocxToHTMLJob: async (_, { file, fileSize }, context) => {
      const jobQueue = await connectToJobQueue()
      const pubsub = await getPubsub()

      const { createReadStream, filename } = await file
      const stream = await createReadStream()

      const jobId = crypto.randomBytes(3).toString('hex')
      const pubsubChannel = `${DOCX_TO_HTML}.${context.user}.${jobId}`

      // A reference to actual pgboss job row
      let queueJobId

      pubsub.subscribe(pubsubChannel, async ({ docxToHTMLJob: { status } }) => {
        logger.info(pubsubChannel, status)
        if (status === 'Conversion complete') {
          await waait(1000)
          // console.log(job, queueJobId, db)
          pubsub.publish(pubsubChannel, {
            docxToHTMLJob: {
              status: 'Done',
              id: queueJobId,
            },
          })
        }
      })

      pubsub.publish(pubsubChannel, {
        docxToHTMLJob: {
          status: `Uploading file ${filename}`,
          id: jobId,
        },
      })

      const chunks = []

      stream.on('data', chunk => {
        chunks.push(chunk)
      })

      stream.on('end', () => {
        pubsub.publish(pubsubChannel, {
          docxToHTMLJob: {
            status: 'File uploaded and conversion job created',
            id: jobId,
          },
        })

        const result = Buffer.concat(chunks)

        jobQueue
          .publish(`xsweetGraphQL`, {
            docx: {
              name: filename,
              data: result.toString('base64'),
            },
            pubsubChannel,
          })
          .then(id => (queueJobId = id))
      })

      stream.on('error', e => {
        pubsub.publish(pubsubChannel, {
          status: e,
        })
      })

      return {
        status: 'Uploading file',
        id: jobId,
      }
    },
  },
  Query: {
    docxToHTMLJob: async (_, { jobId }, context) => {
      const job = await db('pgboss.job').whereRaw(
        "data->'request'->>'id' = ?",
        [jobId],
      )
      return {
        status: 'Final',
        html: job[0].data.response.html,
      }
    },
  },
  Subscription: {
    docxToHTMLJob: {
      subscribe: async (_, { jobId }, context) => {
        const pubsub = await getPubsub()
        return pubsub.asyncIterator(`${DOCX_TO_HTML}.${context.user}.${jobId}`)
      },
    },
  },
}

const typeDefs = `
  extend type Mutation {
    # Upload a file, store it on the server and return the file url
    createDocxToHTMLJob(file: Upload!, fileSize: Int): DocxToHTMLJob
  }

  extend type Subscription {
    docxToHTMLJob(jobId: String!): DocxToHTMLJob!
  }

  extend type Query {
    docxToHTMLJob(jobId: String!): DocxToHTMLJob!
  }

  type DocxToHTMLJob {
    id: String
    status: String!
    html: String
  }
`

module.exports = { typeDefs, resolvers }
