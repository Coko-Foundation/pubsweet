const config = require('config')
const logger = require('@pubsweet/logger')
const path = require('path')

const { execSync } = require('child_process')

module.exports = async argsOverride => {
  logger.info('Starting PubSweet client app (with Webpack)')
  const webpackConfig = path.join(
    'webpack',
    `webpack.${config.util.getEnv('NODE_ENV')}.config.js`,
  )
  execSync(`yarn webpack-dev-server --config ${webpackConfig}`, {
    stdio: 'inherit',
  })
}
