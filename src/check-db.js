const logger = require('@pubsweet/logger')

module.exports = async appPath => {
  // skip this during tests, as we use an in-memory DB
  if (process.env.NODE_ENV === 'test') return

  const dbPath = require('./db-path')(appPath)
  const exists = await require('./db-exists')(dbPath)

  if (!exists) {
    logger.error('Database appears not to exist')
    logger.error('To create the database for an existing app, see `pubsweet help setupdb`')
    logger.error('To generate a new app, see `pubsweet help new`')
    throw new Error('Database appears not to exist')
  }

  logger.info('Database at', dbPath, 'exists')
}
