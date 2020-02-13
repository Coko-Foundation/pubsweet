import express from 'express'
import { promisify } from 'util'
import http from 'http'
import config from 'config'
import fs from 'fs'
import path from 'path'
import logger from '@pubsweet/logger'
import * as PubSweet from './types'

let server

const startServer = async (
  app: PubSweet.Application = express(),
): Promise<PubSweet.Server> => {
  if (server) return server

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
  const httpServer = (http.createServer(
    configuredApp,
  ) as unknown) as PubSweet.Server

  httpServer.app = configuredApp

  logger.info(`Starting HTTP server`)

  const startListening = promisify(httpServer.listen).bind(httpServer)
  await startListening(port)
  logger.info(`App is listening on port ${port}`)
  await configuredApp.onListen(httpServer)
  httpServer.originalClose = httpServer.close

  httpServer.close = async (cb): Promise<void> => {
    server = undefined
    await configuredApp.onClose()
    return httpServer.originalClose(cb)
  }

  server = httpServer

  return httpServer
}

module.exports = startServer
