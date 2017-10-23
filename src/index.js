const path = require('path')
const config = require('config')
const dotenvPath = path.resolve(`.env.${config.util.getEnv('NODE_ENV')}`)
require('dotenv').config({ path: dotenvPath })

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const index = require('./routes/index')
const api = require('./routes/api')
const logger = require('@pubsweet/logger')
const sse = require('pubsweet-sse')
const authentication = require('./authentication')
const models = require('./models')
const _ = require('lodash/fp')
const STATUS = require('http-status-codes')
const registerComponents = require('./register-components')
const startServer = require('./start-server')

const configureApp = (app) => {
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

  registerComponents(app)

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
    if (app.get('env') === 'development' || app.get('env') === 'test') {
      logger.error(err)
      logger.error(err.stack)
    }

    if (err.name === 'ValidationError') {
      return res.status(STATUS.BAD_REQUEST).json({ message: err.message })
    } else if (err.name === 'ConflictError') {
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

let server

const start = async (app = express()) => {
  if (server) return server
  const configuredApp = configureApp(app)
  server = await startServer(configuredApp)
  server.expressApp = app
  return server
}

start.configureApp = configureApp

module.exports = start
