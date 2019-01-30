const crypto = require('crypto')
const moment = require('moment')
const config = require('config')

const logger = require('@pubsweet/logger')
const querystring = require('querystring')
const bodyParser = require('body-parser')

const transport = require('./transport')

// fail early if these configs are missing
const baseUrl = config.get('pubsweet-server.baseUrl')
const configSender = config.get('mailer.from')

const PasswordResetBackend = app => {
  app.post('/api/password-reset', bodyParser.json(), async (req, res, next) => {
    try {
      const pathToPage =
        config.get('password-reset.pathToPage') || '/password-reset'
      const tokenLength = config.get('password-reset.token-length') || 32

      const { token, password, username } = req.body

      if (!username) {
        res.status(400).json({ error: 'Username must be specified' })
        return
      }

      // load the user by username
      // TODO: use findOneByField
      const user = await app.locals.models.User.findByField(
        'username',
        username,
      ).then(results => (results ? results[0] : null))

      if (!user) {
        res.status(400).json({ error: 'User not found' })
        return
      }

      if (token && password) {
        // change the password

        if (token !== user.passwordResetToken) {
          res.status(400).json({ error: 'invalid' })
          return
        }

        if (
          moment()
            .subtract(24, 'hours')
            .isAfter(user.passwordResetTimestamp)
        ) {
          res.status(400).json({ error: 'expired' })
          return
        }

        user.password = password
        delete user.passwordResetToken
        delete user.passwordResetTimestamp

        await user.save()

        res.sendStatus(200)
      } else {
        // send a password reset email

        user.passwordResetToken = crypto
          .randomBytes(tokenLength)
          .toString('hex')
        user.passwordResetTimestamp = moment().format()

        await user.save()

        const token = querystring.encode({
          username,
          token: user.passwordResetToken,
        })
        const passwordResetURL = `${baseUrl}${pathToPage}?${token}`

        logger.info(`Sending password reset email to ${user.email}`)

        await transport.sendMail({
          from: configSender,
          to: user.email,
          subject: 'Password reset',
          text: `Reset your password: ${passwordResetURL}`,
          html: `<p><a href="${passwordResetURL}">Reset your password</a></p>`,
        })

        res.sendStatus(200)
      }
    } catch (e) {
      next(e)
    }
  })
}

module.exports = PasswordResetBackend
