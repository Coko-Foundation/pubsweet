const {
  jobs: { connectToJobQueue },
} = require('pubsweet-server')

const { getPubsub } = require('pubsweet-server/src/graphql/pubsub')

const CONVERT_DOCX_TO_HTML = 'CONVERT_DOCX_TO_HTML'

const resolvers = {
  Mutation: {
    createDocxToHTMLJob: async (_, { file, fileSize }, context) => {
      const jobQueue = await connectToJobQueue()
      const pubsub = await getPubsub()

      const { createReadStream, filename } = await file
      const stream = await createReadStream()
      const pubsubChannel = `${CONVERT_DOCX_TO_HTML}.${context.user}`

      pubsub.publish(pubsubChannel, {
        docxToHTMLJob: { status: `Uploading file ${filename}` },
      })

      const chunks = []

      stream.on('data', chunk => {
        chunks.push(chunk)
      })

      return new Promise((resolve, reject) => {
        stream.on('end', () => {
          pubsub.publish(pubsubChannel, {
            docxToHTMLJob: { status: 'File uploaded' },
          })

          const result = Buffer.concat(chunks)

          jobQueue.publish(`xsweetGraphQL`, {
            docx: {
              name: filename,
              data: result.toString('base64'),
            },
            pubsubChannel,
          })

          resolve({ status: 'Conversion job submitted' })
        })
        stream.on('error', reject)
      })
    },
  },
  Subscription: {
    docxToHTMLJob: {
      subscribe: async (_, vars, context) => {
        const pubsub = await getPubsub()
        return pubsub.asyncIterator(`${CONVERT_DOCX_TO_HTML}.${context.user}`)
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
    docxToHTMLJob: DocxToHTMLJob!
  }

  type DocxToHTMLJob {
    status: String!
    html: String
  }
`

module.exports = { typeDefs, resolvers }
