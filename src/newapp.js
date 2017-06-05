const path = require('path')
const logger = require('./logger')

module.exports = async opts => {
  await require('./check-no-app')(opts)

  await require('./chdir')(opts.appPath)
  logger.info('Current working dir is', process.cwd())

  await require('./initial-app')(opts.appPath)

  require('./load-config')(path.resolve('', './config'))
  logger.info('Config dir is', process.env.NODE_CONFIG_DIR)

  await require('./setup-db')(opts)

  // generate the env file when setting up the database
  // TODO: should this be more explicit
  await require('./generate-env')()
}
