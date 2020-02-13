import express from 'express'
import wait from 'waait'
import PubSweet from './types'

import path = require('path')
import config = require('config')

const dotenvPath = path.resolve(`.env.${config.util.getEnv('NODE_ENV')}`)
require('dotenv').config({ path: dotenvPath })

import morgan = require('morgan')
import helmet = require('helmet')
import cookieParser = require('cookie-parser')
import bodyParser = require('body-parser')
import _ = require('lodash/fp')
import STATUS = require('http-status-codes')

import passport = require('passport')
import logger = require('@pubsweet/logger')
import sse = require('pubsweet-sse')
import gqlApi = require('./graphql/api')
import index = require('./routes/index')
import api = require('./routes/api')

import registerComponents = require('./register-components')

import models = require('@pubsweet/models')
import authsome = require('./helpers/authsome')

import authentication = require('./authentication')

import subscriptions = require('./graphql/subscriptions')
import jobs = require('./jobs')

const configureApp = (app: PubSweet.Application): PubSweet.Application => {
  app.locals.models = models

  app.use(bodyParser.json({ limit: '50mb' }))
  morgan.token('graphql', ({ body }, res, type) => {
    if (!body.operationName) return ''
    switch (type) {
      case 'query':
        return body.query.replace(/\s+/g, ' ')
      case 'variables':
        return JSON.stringify(body.variables)
      case 'operation':
      default:
        return body.operationName
    }
  })
  app.use(
    morgan(config.get('pubsweet-server').morganLogFormat || 'combined', {
      stream: logger.stream,
    }),
  )

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(helmet())
  app.use(express.static(path.resolve('.', '_build')))

  if (config.has('pubsweet-server.uploads')) {
    app.use(
      '/uploads',
      express.static(path.resolve(config.get('pubsweet-server.uploads'))),
    )
  }
  // Passport strategies
  app.use(passport.initialize())

  // Register passport authentication strategies
  passport.use('bearer', authentication.strategies.bearer)
  passport.use('anonymous', authentication.strategies.anonymous)
  passport.use('local', authentication.strategies.local)

  app.locals.passport = passport
  app.locals.authsome = authsome

  registerComponents(app)

  // REST API
  app.use('/api', api)

  // GraphQL API
  gqlApi(app)

  // SSE update stream
  if (_.get('pubsweet-server.sse', config)) {
    sse.setAuthsome(authsome)
    app.get(
      '/updates',
      passport.authenticate('bearer', { session: false }),
      sse.connect,
    )

    app.locals.sse = sse
  }

  // Serve the index page for front end
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

  // Actions to perform when the HTTP server starts listening
  app.onListen = async (server): Promise<void> => {
    // Add GraphQL subscriptions
    subscriptions.addSubscriptions(server)

    // Manage job queue
    // const { staratJobQueue } = jobs
    await jobs.startJobQueue()
  }

  // Actions to perform when the server closes
  app.onClose = async (): Promise<void> => {
    // const wait = require('waait')
    // const { stopJobQueue } = require('./jobs')
    await jobs.stopJobQueue()
    return wait(500)
  }

  return app
}

module.exports = configureApp
