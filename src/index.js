const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const api = require('./routes/api')
const logger = require('./logger')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const config = require('../config')

// const favicon = require('serve-favicon')
const app = express()

global.versions = {}

// uncomment after placing your favicon in /public
// app.use(favicon (path.join(__dirname, 'public', 'favicon.ico')))

app.use(require('morgan')('combined', { 'stream': logger.stream }))
app.use(bodyParser.json({ limit: '50mb' }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve('.', 'public')))

// Passport strategies
app.use(passport.initialize())
const BearerStrategy = require('passport-http-bearer').Strategy
const AnonymousStrategy = require('passport-anonymous').Strategy
const LocalStrategy = require('passport-local').Strategy

passport.use('bearer', new BearerStrategy(
  (token, done) => {
    jwt.verify(token, config.get('pubsweet-backend.secret'), (err, decoded) => {
      if (!err) {
        return done(null, decoded.id, {
          username: decoded.username,
          id: decoded.id,
          token: token
        })
      } else {
        return done(null)
      }
    })
  }
))

passport.use('anonymous', new AnonymousStrategy())

passport.use('local', new LocalStrategy((username, password, done) => {
  logger.info('User finding:', username)
  User.findByUsername(username).then((user) => {
    logger.info('User found:', user.username)
    if (!user) {
      return done(null, false, { message: 'Wrong username.' })
    }
    if (!user.validPassword(password)) {
      logger.info('Invalid password for user:', username)
      return done(null, false, { message: 'Wrong password.' })
    }
    return done(null, user, {id: user.id})
  }).catch((err) => {
    logger.info('User not found', err)
    if (err) { return done(err) }
  })
}))

// Main API
app.use('/api', api)

// Serve the index page for front end
app.use('/manage', index)
app.use('/', index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  // development error handler, will print stacktrace
  if (app.get('env') === 'dev' || app.get('env') === 'test') {
    logger.error(err)
    logger.error(err.stack)
  }

  if (err.name === 'ConflictError') {
    return res.status(409).json({ message: err.message })
  } else if (err.name === 'AuthorizationError') {
    res.status(err.status).json({ message: err.message })
  } else {
    res.status(err.status || 500).json({ message: err.message })
  }
})

module.exports = app
