const path = require('path')
const backend = require('./backend')
const dotenvPath = path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
require('dotenv').config({ path: dotenvPath })

const http = require('http')

const express = require('express')
const webpack = require('webpack')
const pubsweet = require(`${backend()}`)
const config = require(path.join(process.cwd(), `config/${process.env.NODE_ENV}`))

const logger = require('./logger')

const collect = (val, memo) => memo.push(val) && memo

let program

let server
let serverListening = false

const webpackconfig = require(
  path.join(
    process.cwd(), 'webpack', `webpack.${process.env.NODE_ENV}.config.js`
  )
)

if (process.env.NODE_ENV === 'test') webpackconfig.target = 'electron-main'

const onError = err => logger.error(err.stack) && process.exit(1)

const registerDevtools = (app, compiler, cb) => {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
      colors: true,
      chunks: false
    },
    publicPath: '/assets/'
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  cb()
}

const registerComponents = app => {
  const components = config.pubsweet.components
  components.forEach(name => {
    const component = require(path.join(process.cwd(), 'node_modules', name))
    if (component.backend) {
      logger.info('Registered backend component', name)
      component.backend()(app)
    }
  })
}

let watcher
const startWatcher = () => {
  const chokidar = require('chokidar')
  watcher = chokidar.watch(process.cwd(), {
    ignored: /(node_modules|_build|api\/db|.git|logs|static|webpack|pubsweet.log|app|uploads|.idea)/
  })

  let update = (msg, reload) => {
    logger.info(`Detected filesystem change: ${msg}`)
    if (reload) reloadServer()
  }

  watcher
    .on('ready', () => {
      logger.info('Watching for filesystem changes')
      watcher
        .on('add', path => update(`File ${path} added`, true))
        .on('change', path => update(`File ${path} changed`, true))
        .on('unlink', path => update(`File ${path} removed`, true))
        .on('addDir', path => update(`Directory ${path} added`, true))
        .on('unlinkDir', path => update(`Directory ${path} removed`, true))
        .on('error', onError)
    })

  program.watch.forEach(watcher.add)
}

const compiler = webpack(webpackconfig)

const runapp = (err, stats, cb) => {
  if (err) onError(err)

  const rawapp = express()

  rawapp.get('*.js', function (req, res, next) {
    if (/\.js$|\.css$|\.html$/.test(req.url)) {
      req.url = req.url + '.gz'
      res.set('Content-Encoding', 'gzip')
    }
    next()
  })

  const postcompile = (err, stats) => {
    if (err) {
      logger.error('Webpack compilation failed:', err)
      process.exit(1)
    } else if (stats) {
      logger.info('Webpack compilation completed:', stats.toString({
        hash: false,
        chunks: false,
        assets: false
      }))
    }

    registerComponents(rawapp)
    logger.info(`Registered components`)

    const app = pubsweet(rawapp)
    logger.info(`Setup app`)

    const port = process.env.PORT || 3000
    app.set('port', port)
    logger.info(`Using port ${port}`)

    server = http.createServer(app)
    logger.info(`Created HTTP server`)

    const onListening = () => {
      // logger.info(`PubSweet is listening on port ${server.address().port}`)
      logger.info(`PubSweet is listening on port ${port}`)
      serverListening = true
      if (cb) cb(server) // used to enable testing
      if (process.env.NODE_ENV === 'dev' && !watcher) startWatcher()
    }

    server.on('error', onError)
    server.on('listening', onListening)

    server.listen(port)
  }

  if (process.env.NODE_ENV === 'dev') {
    registerDevtools(rawapp, compiler, postcompile)
  } else {
    compiler.run(postcompile)
  }
}

const reloadServer = () => {
  if (serverListening) {
    logger.info('Restarting app')
    serverListening = false
    server.close(runapp)
  } else {
    server.on('listening', () => {
      setTimeout(() => server.close(reloadServer), 100)
    })
  }
}

if (require.main === module) {
  // file is being executed
  // console.log('start.js FILE IS BEING EXECUTED')
  program = require('commander')

  program
    .option('--watch [path]', 'Watch path for changes', collect, [])
    .parse(process.argv)

  runapp()
} else {
  // file is being required - used to enable testing
  // console.log('start.js FILE IS BEING REQUIRED')
  module.exports = cb => runapp(null, null, cb)
}
