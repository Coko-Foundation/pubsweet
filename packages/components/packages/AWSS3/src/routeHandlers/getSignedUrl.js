const { promisify } = require('util')
const logger = require('@pubsweet/logger')

const getSignedUrl = (s3, s3Config) => {
  const asyncGetSignedUrl = promisify(s3.getSignedUrl.bind(s3))
  return async (req, res) => {
    const params = {
      Bucket: s3Config.bucket,
      Key: `${req.params.fragmentId}/${req.params.fileId}`,
    }

    try {
      const signedUrl = await asyncGetSignedUrl(params)
      res.status(200).json({
        signedUrl,
      })
    } catch (err) {
      logger.error(err.message)
      res.status(err.statusCode).json({ error: err.message })
    }
  }
}

module.exports = getSignedUrl
