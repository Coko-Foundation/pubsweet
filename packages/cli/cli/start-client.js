const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

const { promisify } = require('util')

// const forever = require('forever-monitor')
// const _ = require('lodash')
const config = require('config')
const logger = require('@pubsweet/logger')
const path = require('path')
// const { dbExists, setupDb } = require('@pubsweet/db-manager')
// const { ordinalize } = require('inflection')
const express = require('express')
const http = require('http')

const webpack = requireRelative('webpack')

const webpackDevMw = require('webpack-dev-middleware')
const webpackHotMw = require('webpack-hot-middleware')

module.exports = async argsOverride => {
  logger.info('Starting PubSweet client app')

  const webpackConfig = require(path.resolve(
    'webpack',
    `webpack.${config.util.getEnv('NODE_ENV')}.config.js`,
  ))
  const compiler = webpack(webpackConfig)
  const app = express()

  app.use(
    webpackDevMw(compiler, {
      stats: 'normal',
      publicPath: '/assets/',
    }),
  )
  app.use(webpackHotMw(compiler))

  const httpServer = http.createServer(app)
  httpServer.app = app

  logger.info(`Starting Webpack server`)
  const startListening = promisify(httpServer.listen.bind(httpServer))
  await startListening(9000)
  logger.info(`Webpack server is listening on port 9000`)
}
