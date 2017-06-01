const fs = require('fs-extra')
const path = require('path')
const logger = require('./logger')

module.exports = async ({ appPath, override = {} }) => {
  // the path to the db directory
  const dbPath = require('./db-path')(appPath)

  // TODO: check that the path is appropriate?

  // the path to a db file within the db directory
  const dbCheckPath = path.join(dbPath, 'CURRENT')

  logger.info('Checking that', dbCheckPath, 'does not exist')

  // if the file doesn't exist, that's fine
  if (!await fs.pathExists(dbCheckPath)) return

  logger.info('Database appears to already exist')

  // if there's no "clobber" setting, that's a problem
  if (!override.clobber) {
    logger.error('If you want to overwrite the database, use --clobber')
    throw new Error('Target database exists, not clobbering')
  }

  // if there's a "clobber" setting, remove the existing database dir
  logger.info('Overwriting existing database due to --clobber flag')
  await fs.remove(dbPath)
  logger.info('Removed', dbPath)
}
