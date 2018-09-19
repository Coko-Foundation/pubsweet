const db = require('../../src/db')
const logger = require('@pubsweet/logger')
const { migrate } = require('@pubsweet/db-manager')

const dbCleaner = async () => {
  await db.raw('DROP SCHEMA public CASCADE;')
  await db.raw('CREATE SCHEMA public;')
  await db.raw('GRANT ALL ON SCHEMA public TO public;')
  await migrate()
  logger.info('Dropped all tables and ran all migrations')
}

module.exports = dbCleaner
