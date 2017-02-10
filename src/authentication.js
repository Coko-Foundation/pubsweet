const logger = require('./logger')
const jwt = require('jsonwebtoken')

const BearerStrategy = require('passport-http-bearer').Strategy
const AnonymousStrategy = require('passport-anonymous').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/User')

module.exports = {
  // no credentials
  anonymous: new AnonymousStrategy(),

  // JSON web token in "Bearer" HTTP header
  bearer: new BearerStrategy((token, done) => {
    jwt.verify(token, process.env.PUBSWEET_SECRET, (err, decoded) => {
      if (err) return done(null)

      return done(null, decoded.id, {
        username: decoded.username,
        id: decoded.id,
        token: token
      })
    })
  }),

  // email + password
  local: new LocalStrategy((username, password, done) => {
    let errorMessage = 'Wrong username or password.'
    logger.info('User finding:', username)

    User.findByUsername(username).then(user => {
      logger.info('User found:', user.username)
      return Promise.all([user, user.validPassword(password)])
    }).then(([user, isValid]) => {
      if (isValid) {
        return done(null, user, { id: user.id })
      } else {
        logger.info('Invalid password for user:', username)
        return done(null, false, { message: errorMessage })
      }
    }).catch((err) => {
      logger.info('User not found', err)
      if (err) { return done(null, false, { message: errorMessage }) }
    })
  })
}
