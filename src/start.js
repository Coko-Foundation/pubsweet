const path = require('path')
const backend = require('./backend')
const dotenvPath = path.join(process.cwd(), `.env.${process.env.NODE_ENV}`)
require('dotenv').config({ path: dotenvPath })

const http = require('http')

const express = require('express')
const webpack = require('webpack')
const pubsweet = require(`${backend()}`)
const config = require(`${process.env.NODE_CONFIG_DIR}/${process.env.NODE_ENV}.js`)

const logger = require('./logger')
const program = require('commander')

const collect = (val, memo) => memo.push(val) && memo

program
  .option('--watch [path]', 'Watch path for changes', collect, [])
  .parse(process.argv)

let server
let serverListening = false

const webpackconfig = require(
  path.join(
    process.cwd(), 'webpack', `webpack.${process.env.NODE_ENV}.config.js`
  )
)

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
    ignored: /(node_modules|_build|api\/db|.git|logs|static|webpack|pubsweet.log|app)/
  })

  update = (msg, reload) => {
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
        .on('error', error => onError)
    })

  program.watch.forEach(watcher.add)
}

const compiler = webpack(webpackconfig)

const runapp = (err, stats) => {

  if (err) onError(err)

  const rawapp = express()

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

    const app = pubsweet(rawapp)

    const port = process.env.PORT || '3000'
    app.set('port', port)

    server = http.createServer(app)

    const onListening = () => {
      serverListening = true
      const addr = server.address()
      logger.info(`PubSweet is listening on port ${addr.port}`)

      if (process.env.NODE_ENV === 'dev' && !watcher) startWatcher()
    }

    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
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

runapp()
