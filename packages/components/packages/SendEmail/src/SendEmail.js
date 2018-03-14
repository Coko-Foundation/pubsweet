const nodemailer = require('nodemailer')
const config = require('config')
const logger = require('@pubsweet/logger')

const mailerConfig = require(config.mailer.path)
module.exports = {
  send: mailData => {
    const transporter = nodemailer.createTransport(mailerConfig.transport)
    return transporter.sendMail(mailData, (err, info) => {
      if (err) {
        logger.error(err)
      }
      logger.info(`success message id: ${info.response}`)
    })
  },
}
