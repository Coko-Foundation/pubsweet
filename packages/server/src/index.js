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
const graphqlApi = require('./graphql/routes')
const index = require('./routes/index')
const api = require('./routes/api')
const authsome = require('./helpers/authsome')
const logger = require('@pubsweet/logger')
const sse = require('pubsweet-sse')
const authentication = require('./authentication')
const models = require('./models')
const _ = require('lodash/fp')
const STATUS = require('http-status-codes')
const registerComponents = require('./register-components')
const startServer = require('./start-server')

const configureApp = app => {
  global.versions = {}

  app.locals.models = models

  app.use(morgan('combined', { stream: logger.stream }))
  app.use(bodyParser.json({ limit: '50mb' }))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(helmet())
  app.use(express.static(path.resolve('.', '_build')))
  app.use(
    '/uploads',
    express.static(path.resolve(config.get('pubsweet-server.uploads'))),
  )

  // Passport strategies
  app.use(passport.initialize())
  passport.use('bearer', authentication.strategies.bearer)
  passport.use('anonymous', authentication.strategies.anonymous)
  passport.use('local', authentication.strategies.local)

  app.locals.passport = passport
  app.locals.authsome = authsome

  registerComponents(app)

  // REST API
  app.use('/api', api)

  // GraphQL API
  // temporary environment check while this stuff is in beta
  if (['development', 'test'].includes(config.util.getEnv('NODE_ENV'))) {
    app.use(graphqlApi)
  }
  // SSE update stream
  if (_.get('pubsweet-server.sse', config)) {
    sse.setContext(authsome)

    app.get(
      '/updates',
      passport.authenticate('bearer', { session: false }),
      sse.connect,
    )

    app.locals.sse = sse
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
    }
    return res
      .status(err.status || STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  })

  return app
}

let server

const start = async (app = express()) => {
  if (server) return server
  const configuredApp = configureApp(app)
  server = await startServer(configuredApp)
  server.app = configuredApp
  return server
}

start.configureApp = configureApp

module.exports = start
