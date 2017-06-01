const fs = require('fs-extra')
const path = require('path')
const logger = require('./logger')
const dbPath = require('./db-path')

module.exports = async appPath => {
  // skip this during tests, as we use an in-memory DB
  if (process.env.NODE_ENV === 'test') return

  const dbCheckPath = path.join(dbPath(appPath), 'CURRENT')

  logger.info('Checking that', dbCheckPath, 'exists')

  if (!await fs.pathExists(dbCheckPath)) {
    logger.error('Database appears not to exist')
    logger.error('To create the database for an existing app, see `pubsweet help setupdb`')
    logger.error('To generate a new app, see `pubsweet help new`')
    throw new Error('Database appears not to exist')
  }

  logger.info(dbCheckPath, 'exists')
}
