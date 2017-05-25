const path = require('path')
const logger = require('./logger')

module.exports = async opts => {
  await require('./check-exists')(opts.appPath)
  logger.info('Checked that the app exists')

  await require('./check-no-db')(opts)
  logger.info('Checked that no db exists')

  await require('./chdir')(opts.appPath)
  logger.info('Current working dir is', process.cwd())

  require('./load-config')(path.resolve('', './config'))
  logger.info('Loaded config')

  await require('./setup-db')(opts)
  logger.info('Finished setting up the database')
}
