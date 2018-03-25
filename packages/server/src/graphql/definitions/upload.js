const { GraphQLUpload } = require('apollo-upload-server')
const path = require('path')
const crypto = require('crypto')
const fs = require('fs-extra')
const { promisify } = require('util')
const config = require('config')

const randomBytes = promisify(crypto.randomBytes)
const uploadsPath = config.get('pubsweet-server').uploads

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    upload: async (_, { file }) => {
      const { stream, filename, encoding } = await file

      const raw = await randomBytes(16)
      const generatedFilename = raw.toString('hex') + path.extname(filename)
      const outPath = path.join(uploadsPath, generatedFilename)

      await fs.ensureDir(uploadsPath)
      const outStream = fs.createWriteStream(outPath)
      stream.pipe(outStream, { encoding })

      return new Promise((resolve, reject) => {
        outStream.on('finish', () => resolve({ url: `/${generatedFilename}` }))
        outStream.on('error', reject)
      })
    },
  },
}

const typeDefs = `
  scalar Upload
  
  extend type Mutation {
    # Upload a file, store it on the server and return the file url
    upload(file: Upload!): UploadResult
  } 
  
  type UploadResult {
    url: String
  }
`

module.exports = { typeDefs, resolvers }
