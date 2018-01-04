const logger = require('@pubsweet/logger')
const _ = require('lodash/fp')
const config = require('config')
const dbExists = require('../helpers/db-exists')
const generateEnv = require('./generate-env')
const setupDb = require('./setup-db')
const dbPath = require('../helpers/db-path')
const PouchDB = require('pouchdb')
const { validateSetupDbConfig } = require('../validations')

const checkNoDb = async mergedDbConfig => {
  const exists = await dbExists()
  if (!exists) return

  if (!mergedDbConfig.clobber) {
    logger.error(
      'If you want to overwrite the database, set clobber option to true',
    )
    throw new Error('Target database already exists, not clobbering')
  }

  logger.info('Overwriting existing database due to clobber option')
  await new PouchDB(dbPath()).destroy()
  logger.info('Removed DB at', dbPath())
}

module.exports = async setupDbConfig => {
  const mergedDbConfig = _.merge(
    config.has('dbManager') ? config.get('dbManager') : {},
    setupDbConfig,
  )
  config.util.setModuleDefaults(mergedDbConfig)
  validateSetupDbConfig(mergedDbConfig)
  try {
    await checkNoDb(mergedDbConfig)
    generateEnv()
    return await setupDb(mergedDbConfig)
  } catch (e) {
    logger.error('Database setup failed')
    throw e
  }
}
