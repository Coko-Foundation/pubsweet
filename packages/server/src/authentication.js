const logger = require('@pubsweet/logger')
const jwt = require('jsonwebtoken')

const BearerStrategy = require('passport-http-bearer').Strategy
const AnonymousStrategy = require('passport-anonymous').Strategy
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/User')
const config = require('config')

const createToken = user => {
  logger.debug('Creating token for', user.username)

  return jwt.sign(
    {
      username: user.username,
      id: user.id,
    },
    config.get('pubsweet-server.secret'),
    { expiresIn: 24 * 3600 },
  )
}

const verifyToken = (token, done) => {
  jwt.verify(token, config.get('pubsweet-server.secret'), (err, decoded) => {
    if (err) return done(null)

    return done(null, decoded.id, {
      username: decoded.username,
      id: decoded.id,
      token,
    })
  })
}

const verifyPassword = (username, password, done) => {
  const errorMessage = 'Wrong username or password.'
  logger.debug('User finding:', username)

  User.findByUsername(username)
    .then(user => {
      logger.debug('User found:', user.username)
      return Promise.all([user, user.validPassword(password)])
    })
    .then(([user, isValid]) => {
      if (isValid) {
        return done(null, user, { id: user.id })
      }
      logger.debug('Invalid password for user:', username)
      return done(null, false, { message: errorMessage })
    })
    .catch(err => {
      logger.debug('User not found', err)
      if (err) {
        return done(null, false, { message: errorMessage })
      }
    })
}

module.exports = {
  token: {
    create: createToken,
    verify: verifyToken,
  },
  strategies: {
    // no credentials
    anonymous: new AnonymousStrategy(),

    // JSON web token in "Bearer" HTTP header
    bearer: new BearerStrategy(verifyToken),

    // email + password
    local: new LocalStrategy(verifyPassword),
  },
}
