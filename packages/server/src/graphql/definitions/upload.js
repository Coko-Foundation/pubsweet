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
      const outPath = path.join(
        uploadsPath,
        raw.toString('hex') + path.extname(filename),
      )

      await fs.ensureDir(uploadsPath)
      const outStream = fs.createWriteStream(outPath)
      stream.pipe(outStream, { encoding })

      return new Promise((resolve, reject) => {
        outStream.on('finish', () => resolve({ filename: outPath }))
        outStream.on('error', reject)
      })
    },
  },
}

const typeDefs = `
  scalar Upload
  
  extend type Mutation {
    # Upload a file, store it on the server and return the generated file name
    upload(file: Upload!): UploadResult
  } 
  
  type UploadResult {
    filename: String
  }
`

module.exports = { typeDefs, resolvers }
