const requireRelative = require('require-relative')

const webpack = requireRelative('webpack')
const Promise = require('bluebird')
const path = require('path')
const webpackDevMw = require('webpack-dev-middleware')
const webpackHotMw = require('webpack-hot-middleware')
const logger = require('@pubsweet/logger')
const onError = require('../error-exit')
const config = require('config')

const webpackConfig = require(path.resolve(
  'webpack',
  `webpack.${config.util.getEnv('NODE_ENV')}.config.js`,
))
const compiler = webpack(webpackConfig)

const buildDev = async app => {
  try {
    app.use(
      webpackDevMw(compiler, {
        stats: 'normal',
        publicPath: '/assets/',
      }),
    )
    app.use(webpackHotMw(compiler))
  } catch (e) {
    logger.error('Webpack compilation failed')
    onError(e)
  }
  return app
}

const buildProd = async () => {
  const compileForProd = Promise.promisify(compiler.run, { context: compiler })
  try {
    const stats = await compileForProd()
    logger.info(
      'Webpack compilation completed:',
      stats.toString({
        hash: false,
        chunks: false,
        assets: false,
      }),
    )
  } catch (e) {
    logger.error('Webpack compilation failed')
    onError(e)
  }
}

const build = async app => {
  if (config.util.getEnv('NODE_ENV') === 'development') {
    return buildDev(app)
  }
  return buildProd()
}

module.exports = { build, buildDev, buildProd }
