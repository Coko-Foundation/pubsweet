const nodemailer = require('nodemailer')
const config = require('config')
const _ = require('lodash')
const logger = require('@pubsweet/logger')

const mailerConfig = _.get(config, 'mailer')

module.exports = {
  sendEmail: (toEmail, subject, textBody, htmlBody) => {
    const transporter = nodemailer.createTransport(mailerConfig.transport)
    transporter.sendMail(
      {
        from: mailerConfig.from,
        to: toEmail,
        subject,
        text: textBody,
        html: htmlBody,
      },
      (err, info) => {
        if (err) {
          logger.error(err)
        }
        logger.debug(info)
      },
    )
  },
}
