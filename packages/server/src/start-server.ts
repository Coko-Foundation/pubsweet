const express = require('express')
import PubSweet from './types'

let server

const startServer = async (app: PubSweet.Application = express()) => {
  if (server) return server
  const http = require('http')
  const config = require('config')
  const fs = require('fs')
  const path = require('path')
  const logger = require('@pubsweet/logger')

  let configureApp
  // ./server/app.js in your app is used if it exist,
  // and no different entrypoint is configured in the
  // config at `pubsweet-server.app`
  const appPath = path.resolve('.', 'server', 'app.js')
  if (config.has('pubsweet-server.app')) {
    // See if a custom app entrypoint is configured
    configureApp = require(config.get('pubsweet-server.app'))
  } else if (fs.existsSync(appPath)) {
    // See if a custom app entrypoint exists at ./server/app.js
    configureApp = require(appPath)
  } else {
    // If no custom entrypoints exist, use the default
    configureApp = require('./app')
  }

  const configuredApp = configureApp(app)
  const port = config['pubsweet-server'].port || 3000
  configuredApp.set('port', port)
  const httpServer = http.createServer(configuredApp)

  httpServer.app = configuredApp

  logger.info(`Starting HTTP server`)
  const { promisify } = require('util')
  const startListening = promisify(httpServer.listen).bind(httpServer)
  await startListening(port)
  logger.info(`App is listening on port ${port}`)
  await configuredApp.onListen(httpServer)

  httpServer.originalClose = httpServer.close

  httpServer.close = async cb => {
    server = undefined
    await configuredApp.onClose()
    return httpServer.originalClose(cb)
  }

  server = httpServer

  return httpServer
}

module.exports = startServer
