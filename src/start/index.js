const path = require('path')
const Promise = require('bluebird')

const config = require('config')
const dotenvPath = path.join(process.cwd(), `.env.${config.util.getEnv('NODE_ENV')}`)
require('dotenv').config({ path: dotenvPath })

const http = require('http')
const express = require('express')
const webpack = require('webpack')
const webpackDevMw = require('webpack-dev-middleware')
const webpackHotMw = require('webpack-hot-middleware')
const pubsweet = require(`${process.cwd()}/node_modules/pubsweet-server`)
const logger = require('@pubsweet/logger')
const onError = require('../error-exit')

const compileBundle = async app => {
  const webpackConfig = require(path.join(process.cwd(), 'webpack', `webpack.${config.util.getEnv('NODE_ENV')}.config.js`))
  const compiler = webpack(webpackConfig)

  if (config.util.getEnv('NODE_ENV') === 'development') {
    app.use(webpackDevMw(compiler, {
      stats: 'normal',
      publicPath: '/assets/'
    }))

    app.use(webpackHotMw(compiler))
  } else {
    const compileForProd = Promise.promisify(compiler.run, { context: compiler })
    try {
      const stats = await compileForProd()
      logger.info('Webpack compilation completed:', stats.toString({
        hash: false,
        chunks: false,
        assets: false
      }))
    } catch (e) {
      logger.error('Webpack compilation failed')
      onError(e)
    }
  }
}

const start = async () => {
  const rawApp = express()
  await compileBundle(rawApp)

  const app = pubsweet(rawApp)
  logger.info(`Registered @pubsweet/server middlewares`)

  const port = process.env.PORT || 3000
  app.set('port', port)
  const server = http.createServer(app)
  logger.info(`Starting HTTP server`)

  server.on('error', onError)
  const startListening = Promise.promisify(server.listen, { context: server })
  await startListening(port)
  logger.info(`App is listening on port ${port}`)
  return server
}

if (require.main === module) { // file is being executed
  start()
} else {
  module.exports = start
}
