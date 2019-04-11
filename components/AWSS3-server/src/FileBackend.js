const _ = require('lodash')
const AWS = require('aws-sdk')
const config = require('config')

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
    '/api/files',
    authBearer,
    upload.single('file'),
    require('./routeHandlers/postFile'),
  )

  app.get(
    '/api/files/:fragmentId/:fileId',
    authBearer,
    require('./routeHandlers/getSignedUrl')(s3, s3Config),
  )

  app.get(
    '/api/files/:fragmentId',
    authBearer,
    require('./routeHandlers/zipFiles')(s3, s3Config),
  )

  app.delete(
    '/api/files/:fragmentId/:fileId',
    authBearer,
    require('./routeHandlers/deleteFile')(s3, s3Config),
  )
}

module.exports = FileBackend
