const { pick } = require('lodash')
const logger = require('@pubsweet/logger')
const createTables = require('./create-tables')
const addUser = require('./add-user')

module.exports = async (setupDbConfig = {}) => {
  try {
    logger.info('Setting up the database')
    await createTables(setupDbConfig.clobber)

    const userData = pick(setupDbConfig, [
      'username',
      'password',
      'admin',
      'email',
    ])
    await addUser(userData)

    logger.info('Finished setting up the database')
  } catch (e) {
    logger.error('Database setup failed')
    throw e
  }
}
