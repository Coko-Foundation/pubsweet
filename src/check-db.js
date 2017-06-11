const fs = require('fs-extra')
const path = require('path')
const logger = require('./logger')

module.exports = async appPath => {
  // skip this during tests, as we use an in-memory DB
  if (process.env.NODE_ENV === 'test') return

  const dbPath = require('./db-path')(appPath)

  // skip this if the dbPath is set to an HTTP URL (couchdb)
  if (/^http/.test(dbPath)) return

  const dbCheckPath = path.join(dbPath, 'CURRENT')

  logger.info('Checking that', dbCheckPath, 'exists')

  if (!await fs.pathExists(dbCheckPath)) {
    logger.error('Database appears not to exist')
    logger.error('To create the database for an existing app, see `pubsweet help setupdb`')
    logger.error('To generate a new app, see `pubsweet help new`')
    throw new Error('Database appears not to exist')
  }

  logger.info(dbCheckPath, 'exists')
}
