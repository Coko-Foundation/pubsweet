const bodyParser = require('body-parser')
const config = require('config')
const _ = require('lodash')
const logger = require('@pubsweet/logger')

const sesConfig = _.get(config, 'pubsweet-component-aws-ses')
const transporter = require('./transporter')

const EmailBackend = app => {
  app.use(bodyParser.json())
  const authBearer = app.locals.passport.authenticate('bearer', {
    session: false,
  })
  app.post('/api/email', authBearer, async (req, res) => {
    const { email, emailSubject, textBody, htmlBody } = req.body
    if (
      email === undefined ||
      emailSubject === undefined ||
      textBody === undefined ||
      htmlBody === undefined
    ) {
      res.status(400).json({ error: 'all parameters are required' })
      logger.error('some parameters are missing')
      return
    }

    await transporter.sendMail(
      {
        from: sesConfig.sender,
        to: email,
        subject: emailSubject,
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
    res.status(204).json()
  })
}

module.exports = EmailBackend
