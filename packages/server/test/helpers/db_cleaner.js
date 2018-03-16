const db = require('../../src/db')
const logger = require('@pubsweet/logger')

const dbCleaner = async () => {
  await db.query('DROP TABLE IF EXISTS entities')
  await db.query('CREATE TABLE entities (id UUID PRIMARY KEY, data JSONB)')

  logger.info('Created database')
}

module.exports = dbCleaner
