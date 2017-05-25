const fs = require('fs-extra')
const logger = require('./logger')

module.exports = async ({ appPath, override = {} }) => {
  // if the path doesn't exist, everything is good
  if (!fs.existsSync(appPath)) return

  // if the path is not a directory, that's a problem
  if (!fs.statSync(appPath).isDirectory()) {
    throw new Error('Target path exists and is not a directory')
  }

  // if the directory is empty, that's ok
  if (!fs.readdirSync(appPath)) return

  logger.info('Target directory exists aready and is non-empty')

  // if there's no "clobber" setting, that's a problem
  if (!override.clobber) {
    logger.error('If you want to overwrite existing files, use --clobber')
    throw new Error('Target directory exists, not clobbering')
  }

  // if there's a "clobber" setting, that's ok
  logger.info('Overwriting any existing files due to --clobber flag')
}
