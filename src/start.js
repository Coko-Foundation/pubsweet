const path = require('path')
const http = require('http')

const api = require('pubsweet-backend')
const webpack = require('webpack')

const logger = require('./logger')

console.log('WORKING DIR:', process.cwd())

const webpackconfig = require(
  path.join(
    process.cwd(), 'webpack', `webpack.${process.env.NODE_ENV}.config.js`
  )
)

const runapp = (err, stats) => {
  console.log(err, stats)
  if (err) {
    logger.error(err.stack)
    process.exit(1)
  }

  if (process.env.NODE_ENV === 'dev') {
    const compiler = webpack(webpackconfig)

    api.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: '/assets/'
    }))

    api.use(require('webpack-hot-middleware')(compiler))
  }

  // Get port from environment or default to 3000
  const port = process.env.PORT || '3000'
  api.set('port', port)

  const server = http.createServer(api)

  const onError = err => {
    logger.error(err.stack)
    process.exit(1)
  }

  const onListening = () => {
    const addr = server.address()
    logger.info(`PubSweet is listening on port ${addr.port}`)
  }

  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

webpack(webpackconfig, runapp)
