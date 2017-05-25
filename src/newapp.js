const path = require('path')
const logger = require('./logger')

module.exports = async opts => {
  await require('./check-no-app')(opts)
  logger.info('Checked for existing app')

  await require('./chdir')(opts.appPath)
  logger.info('Current working dir is', process.cwd())

  await require('./initial-app')(opts.appPath)
  logger.info('Generated initial app')

  await require('./generate-env')()
  logger.info('Generated env file')

  require('./load-config')(path.resolve('', './config'))
  logger.info('Loaded the config file')

  await require('./setup-db')(opts)
  logger.info('Set up the database')
}
