const logger = require('@pubsweet/logger')
const nodemailer = require('nodemailer')
const config = require('config')

let mailerConfig = {}
try {
  mailerConfig = require(config.get('mailer.path'))
} catch (err) {
  logger.error(
    'Mailer: The configuration is either invalid or missing. Check here: ' +
      'https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/packages/components/server/component-send-email',
  )
  throw err
}

module.exports = {
  send: mailData => {
    const transporter = nodemailer.createTransport(mailerConfig.transport)
    return transporter
      .sendMail(mailData)
      .then(info => {
        if (process.env.NODE_ENV === 'development') {
          try {
            logger.info(
              `Email sent. Preview available at: ${nodemailer.getTestMessageUrl(
                info,
              )}`,
            )
          } catch (err) {
            logger.info(`Email sent.`)
          }
        }
        return info
      })
      .catch(err => {
        logger.error(`Failed to send email ${err}`)
      })
  },
}
