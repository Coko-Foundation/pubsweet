const PouchDB = require('pouchdb')
const logger = require('./logger')

module.exports = async ({ appPath, override = {} }) => {
  // skip this during tests, as we use an in-memory DB
  if (process.env.NODE_ENV === 'test') return

  const dbPath = require('./db-path')(appPath)
  const exists = await require('./db-exists')(dbPath)

  if (!exists) return

  logger.info('Database appears to already exist')

  // if there's no "clobber" setting, that's a problem
  if (!override.clobber) {
    logger.error('If you want to overwrite the database, use --clobber')
    throw new Error('Target database exists, not clobbering')
  }

  // if there's a "clobber" setting, remove the existing database dir
  logger.info('Overwriting existing database due to --clobber flag')
  await new PouchDB(dbPath).destroy()
  logger.info('Removed DB at', dbPath)
}
