const nodemailer = require('nodemailer')
const config = require('config')
const logger = require('@pubsweet/logger')

const mailerConfig = require(config.mailer.path)
module.exports = {
  send: (toEmail, subject, textBody, htmlBody) =>
    new Promise((resolve, reject) => {
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
            return reject(err)
          }
          logger.info(`success message id: ${info.response}`)
          return resolve(info.response)
        },
      )
    }),
}
