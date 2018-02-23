const nodemailer = require('nodemailer')
const AWS = require('aws-sdk')
const config = require('config')
const _ = require('lodash')

const sesConfig = _.get(config, 'pubsweet-component-aws-ses')

AWS.config.update({
  secretAccessKey: sesConfig.secretAccessKey,
  accessKeyId: sesConfig.accessKeyId,
  region: sesConfig.region,
})
module.exports = nodemailer.createTransport({
  SES: new AWS.SES(),
})
