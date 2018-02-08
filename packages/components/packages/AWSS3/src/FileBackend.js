const AWS = require('aws-sdk')
const logger = require('@pubsweet/logger')
const config = require('config')
const _ = require('lodash')

const s3Config = _.get(config, 'pubsweet-component-aws-s3')

const FileBackend = app => {
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  AWS.config.update({
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    region: s3Config.region,
  })
  const s3 = new AWS.S3()
  const upload = require('./middeware/upload').setupMulter(s3)

  app.post(
    '/api/file',
    authBearer,
    upload.single('file'),
    require('./routeHandlers/postFile'),
  )
  app.get('/api/file/:fragmentId/:fileId', authBearer, async (req, res) => {
    const params = {
      Bucket: s3Config.bucket,
      Key: `${req.params.fragmentId}/${req.params.fileId}`,
    }

    s3.getSignedUrl('getObject', params, (err, data) => {
      if (err) {
        res.status(err.statusCode).json({ error: err.message })
        logger.error(err.message)
        return
      }

      res.status(200).json({
        signedUrl: data,
      })
    })
  })
  app.delete('/api/file/:fragmentId/:fileId', authBearer, async (req, res) => {
    const params = {
      Bucket: s3Config.bucket,
      Key: `${req.params.fragmentId}/${req.params.fileId}`,
    }
    s3.deleteObject(params, (err, data) => {
      if (err) {
        res.status(err.statusCode).json({ error: err.message })
        logger.error(err.message)
        return
      }

      res.status(204).json()
    })
  })
}

module.exports = FileBackend
