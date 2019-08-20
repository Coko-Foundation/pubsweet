const config = require('config')
const logger = require('@pubsweet/logger')
const { execSync } = require('child_process')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

module.exports = async argsOverride => {
  const env = config.util.getEnv('NODE_ENV') // process.env.NODE_ENV
  logger.info(`Starting PubSweet app's server (${env})`)

  if (env === 'development') {
    const serverPath = require.resolve('pubsweet-server/src/start')
    execSync(`yarn node-dev ${serverPath}`, { stdio: 'inherit' })
  } else {
    const { startServer } = requireRelative('pubsweet-server')

    startServer()
  }
}
