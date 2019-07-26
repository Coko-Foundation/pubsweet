const logger = require('@pubsweet/logger')

const requireRelative = m =>
  require(require.resolve(m, { paths: [process.cwd()] }))

module.exports = async argsOverride => {
  logger.info("Starting PubSweet app's server")
  const { startServer } = requireRelative('pubsweet-server')

  startServer()
}
