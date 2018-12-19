const express = require('express')
const { startJobQueue, stopJobQueue } = require('./jobs')

let server
const wait = require('waait')

const startServer = async (app = express()) => {
  if (server) return server

  const http = require('http')
  const config = require('config')
  const Promise = require('bluebird')

  const logger = require('@pubsweet/logger')
  const configureApp = require('./app')
  const { addSubscriptions } = require('./graphql/subscriptions')

  const configuredApp = configureApp(app)
  const port = config['pubsweet-server'].port || 3000
  configuredApp.set('port', port)
  const httpServer = http.createServer(configuredApp)
  httpServer.app = configuredApp

  logger.info(`Starting HTTP server`)
  const startListening = Promise.promisify(httpServer.listen, {
    context: httpServer,
  })
  await startListening(port)
  logger.info(`App is listening on port ${port}`)

  // Add GraphQL subscriptions
  addSubscriptions(httpServer)

  // Manage job queue
  await startJobQueue()

  httpServer.originalClose = httpServer.close
  httpServer.close = async cb => {
    server = undefined
    await stopJobQueue()
    await wait(500)
    return httpServer.originalClose(cb)
  }

  server = httpServer

  return httpServer
}

module.exports = startServer
