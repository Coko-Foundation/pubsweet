const fs = require('fs-extra')
const logger = require('./logger')

const logError = message => {
  logger.error('Path must be a directory containing a pubsweet app')
  logger.error(message)
  logger.error('To generate a new app, see `pubsweet help new`')
}

module.exports = async appPath => {
  logger.info('Checking that', appPath, 'exists')

  if (!await fs.pathExists(appPath)) {
    logError('The path provided does not exist')
    throw new Error('The path provided does not exist')
  }

  const stats = await fs.stat(appPath)

  if (!stats.isDirectory()) {
    logError('The path provided is not a directory')
    throw new Error('The path provided is not a directory')
  }

  logger.info(appPath, 'exists')
}
