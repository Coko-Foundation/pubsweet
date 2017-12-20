const createDb = require('../../src/db')
const logger = require('@pubsweet/logger')

const dbCleaner = async () => {
  await global.db.destroy()

  global.db = createDb()

  const info = await global.db.info()

  logger.info('Created database', info)
}

module.exports = dbCleaner
