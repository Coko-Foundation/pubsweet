const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const index = require('./routes/index')
const api = require('./routes/api')
const logger = require('pubsweet-logger')
const sse = require('pubsweet-sse')
const authentication = require('./authentication')
const models = require('./models')
const config = require('config')
const _ = require('lodash/fp')
const STATUS = require('http-status-codes')

module.exports = (app = express()) => {
  global.versions = {}

  app.locals.models = models

  app.use(morgan('combined', { 'stream': logger.stream }))
  app.use(bodyParser.json({ limit: '50mb' }))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(helmet())
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
  if (_.get('pubsweet-server.sse', config)) {
    app.get('/updates', passport.authenticate('bearer', { session: false }), sse.connect)
  }

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
      return res.status(STATUS.CONFLICT).json({ message: err.message })
    } else if (err.name === 'AuthorizationError') {
      return res.status(err.status).json({ message: err.message })
    } else if (err.name === 'AuthenticationError') {
      return res.status(STATUS.UNAUTHORIZED).json({ message: err.message })
    } else {
      return res.status(err.status || STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
  })

  return app
}
