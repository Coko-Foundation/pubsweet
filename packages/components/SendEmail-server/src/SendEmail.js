const logger = require('@pubsweet/logger')
const nodemailer = require('nodemailer')
const config = require('config')

let mailerConfig = {}
try {
  mailerConfig = require(config.get('mailer.path'))
} catch (err) {
  logger.error(
    'Mailer: The configuration is either invalid or missing. Check here: ' +
      'https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/components/SendEmail-server',
  )
  throw err
}

module.exports = {
  send: mailData => {
    const transporter = nodemailer.createTransport(mailerConfig.transport)
    return transporter.sendMail(mailData)
  },
}
