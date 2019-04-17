const crypto = require('crypto')
const moment = require('moment')
const config = require('config')
const logger = require('@pubsweet/logger')
const querystring = require('querystring')
const { ValidationError } = require('@pubsweet/errors')

const transport = require('./transport')

const resolvers = {
  Mutation: {
    async sendPasswordResetEmail(_, { username }, ctx) {
      // // fail early if these configs are missing
      const baseUrl = config.get('pubsweet-server.baseUrl')
      const configSender = config.get('mailer.from')

      const pathToPage = config.has('password-reset.pathToPage')
        ? config.get('password-reset.pathToPage')
        : '/password-reset'
      const tokenLength = config.has('password-reset.token-length')
        ? config.get('password-reset.token-length')
        : 32

      const user = await ctx.connectors.User.model.query().findOne({ username })

      user.passwordResetToken = crypto.randomBytes(tokenLength).toString('hex')
      user.passwordResetTimestamp = new Date()

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
      return true
    },
    async resetPassword(_, { token, password }, ctx) {
      const user = await ctx.connectors.User.model
        .query()
        .findOne({ passwordResetToken: token })
        .throwIfNotFound()

      if (
        moment()
          .subtract(24, 'hours')
          .isAfter(user.passwordResetTimestamp)
      ) {
        throw new ValidationError('Your token has expired')
      }

      user.password = password
      user.passwordResetToken = null
      user.passwordResetTimestamp = null

      await user.save()

      return user.id
    },
  },
}

module.exports = resolvers
