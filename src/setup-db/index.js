const logger = require('@pubsweet/logger')
const path = require('path')
const config = require('config')
const dbExists = require('../helpers/db-exists')
const generateEnv = require('./generate-env')
const setupDb = require('./setup-db')

const dbPath = config.get('dbManager.dbPath')

const checkNoDb = async dbPath => {
  const exists = await dbExists(dbPath)
  if (!exists) return null

  if (!config.get('dbManager').clobber) {
    logger.error('If you want to overwrite the database, set dbManager.clobber option to true')
    throw new Error('Target database already exists, not clobbering')
  }

  logger.info('Overwriting existing database due to clobber option')
  await new PouchDB(dbPath).destroy()
  logger.info('Removed DB at', dbPath)
}

module.exports = async () => {
  try {
    await checkNoDb()
    generateEnv()
    return await setupDb()
  } catch (e) {
    logger.error('Database setup failed')
    throw e
  }
}
