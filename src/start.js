const path = require('path')
const http = require('http')

const express = require('express')
const webpack = require('webpack')
const pubsweet = require('pubsweet-backend')
const config = require(`${process.env.NODE_CONFIG_DIR}/${process.env.NODE_ENV}.js`)

const logger = require('./logger')

const webpackconfig = require(
  path.join(
    process.cwd(), 'webpack', `webpack.${process.env.NODE_ENV}.config.js`
  )
)

const onError = err => logger.error(err.stack) && process.exit(1)

const registerDevtools = app => {
  const compiler = webpack(webpackconfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
      colors: true,
      chunks: false
    },
    publicPath: '/assets/'
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

const registerComponents = app => {
  const components = config.pubsweet.components
  components.forEach(name => {
    try {
      const component = require(path.join(process.cwd(), 'node_modules', name))

      if (component.backend) {
        logger.info('Registered backend component', name)
        component.backend()(app)
      }
    } catch (err) {
      logger.info('Deferred loading frontend component', name)
    }
  })
}

const runapp = (err, stats) => {
  if (err) onError(err)

  const rawapp = express()

  if (process.env.NODE_ENV === 'dev') registerDevtools(rawapp)

  const app = pubsweet(rawapp)

  const port = process.env.PORT || '3000'
  app.set('port', port)

  registerComponents(app)

  const server = http.createServer(app)

  const onListening = () => {
    const addr = server.address()
    logger.info(`PubSweet is listening on port ${addr.port}`)
  }

  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

webpack(webpackconfig, runapp)
