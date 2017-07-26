const path = require('path')
const logger = require('./logger')

module.exports = async opts => {
  await require('./check-exists')(opts.appPath)

  await require('./check-no-db')(opts)

  await require('./chdir')(opts.appPath)
  logger.info('Current working dir is', process.cwd())

  require('./load-config')(path.resolve('config'))
  logger.info('Config dir is', process.env.NODE_CONFIG_DIR)

  await require('./setup-db')(opts)
}
