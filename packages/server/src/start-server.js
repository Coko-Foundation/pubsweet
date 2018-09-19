const express = require('express')

let server

const startServer = async (app = express()) => {
  const http = require('http')
  const config = require('config')
  const Promise = require('bluebird')

  const logger = require('@pubsweet/logger')
  const configureApp = require('./app')
  const { addSubscriptions } = require('./graphql/subscriptions')

  if (server) return server
  const configuredApp = configureApp(app)
  const port = config['pubsweet-server'].port || 3000
  configuredApp.set('port', port)
  const httpServer = http.createServer(configuredApp)
  logger.info(`Starting HTTP server`)
  const startListening = Promise.promisify(httpServer.listen, {
    context: httpServer,
  })
  await startListening(port)
  logger.info(`App is listening on port ${port}`)

  addSubscriptions(httpServer)
  httpServer.app = configuredApp
  server = httpServer
  return httpServer
}

module.exports = startServer
