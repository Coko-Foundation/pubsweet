const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const index = require('./routes/index')
const api = require('./routes/api')
const logger = require('./logger')
const authentication = require('./authentication')
const sse = require('./sse')
const models = require('./models')

module.exports = (app = express()) => {
  global.versions = {}

  app.locals.models = models

  app.use(require('morgan')('combined', { 'stream': logger.stream }))
  app.use(bodyParser.json({ limit: '50mb' }))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use(express.static(path.resolve('.', '_build')))
  app.use('/uploads', express.static(path.resolve('.', 'uploads')))

  // Passport strategies
  app.use(passport.initialize())
  passport.use('bearer', authentication.strategies.bearer)
  passport.use('anonymous', authentication.strategies.anonymous)
  passport.use('local', authentication.strategies.local)

  // Main API
  app.use('/api', api)

  // SSE update stream
  app.get('/updates', passport.authenticate('bearer', { session: false }), sse.connect)

  // Serve the index page for front end
  app.use('/manage', index)
  app.use('/', index)

  app.use((err, req, res, next) => {
    // development error handler, will print stacktrace
    if (app.get('env') === 'dev' || app.get('env') === 'test') {
      logger.error(err)
      logger.error(err.stack)
    }

    if (err.name === 'ConflictError') {
      return res.status(409).json({ message: err.message })
    } else if (err.name === 'AuthorizationError') {
      return res.status(err.status).json({ message: err.message })
    } else if (err.name === 'AuthenticationError') {
      return res.status(401).json({ message: err.message })
    } else {
      return res.status(err.status || 500).json({ message: err.message })
    }
  })

  return app
}
