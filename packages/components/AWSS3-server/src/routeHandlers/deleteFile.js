const { promisify } = require('util')
const logger = require('@pubsweet/logger')

const deleteFile = (s3, s3Config) => {
  const asyncDeleteObject = promisify(s3.deleteObject.bind(s3))
  return async (req, res) => {
    const params = {
      Bucket: s3Config.bucket,
      Key: `${req.params.fragmentId}/${req.params.fileId}`,
    }

    try {
      await asyncDeleteObject(params)
      res.status(204)
    } catch (err) {
      logger.error(err.message)
      res.status(err.statusCode).json({ error: err.message })
    }
  }
}

module.exports = deleteFile
