const { GraphQLUpload } = require('apollo-upload-server')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs-extra')
const { promisify } = require('util')
const config = require('config')

const { getPubsub, asyncIterators } = require('../pubsub')

const { ON_UPLOAD_PROGRESS } = asyncIterators
const randomBytes = promisify(crypto.randomBytes)
const uploadsPath = config.get('pubsweet-server').uploads

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    upload: async (_, { file, fileSize }, context) => {
      const pubsub = await getPubsub()
      const { stream, filename, encoding } = await file

      const raw = await randomBytes(16)
      const generatedFilename = raw.toString('hex') + path.extname(filename)
      const outPath = path.join(uploadsPath, generatedFilename)

      await fs.ensureDir(uploadsPath)
      const outStream = fs.createWriteStream(outPath)
      stream.pipe(
        outStream,
        { encoding },
      )
      let uploadedSize = 0

      stream.on('data', chunk => {
        uploadedSize += chunk.length
        let uploadProgress
        if (fileSize) {
          uploadProgress = Math.floor((uploadedSize * 100) / fileSize)
        } else {
          uploadProgress = uploadedSize
        }
        pubsub.publish(`${ON_UPLOAD_PROGRESS}.${context.user}`, {
          uploadProgress,
        })
      })

      return new Promise((resolve, reject) => {
        outStream.on('finish', () => resolve({ url: `/${generatedFilename}` }))
        outStream.on('error', reject)
      })
    },
  },
  Subscription: {
    uploadProgress: {
      subscribe: async (_, vars, context) => {
        const pubsub = await getPubsub()
        return pubsub.asyncIterator(`${ON_UPLOAD_PROGRESS}.${context.user}`)
      },
    },
  },
}

const typeDefs = `
  scalar Upload

  extend type Mutation {
    # Upload a file, store it on the server and return the file url
    upload(file: Upload!, fileSize: Int): UploadResult
  }

  extend type Subscription {
    uploadProgress: Int!
  }

  type UploadResult {
    url: String
  }
`

module.exports = { typeDefs, resolvers }
