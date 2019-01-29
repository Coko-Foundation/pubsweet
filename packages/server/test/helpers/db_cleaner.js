const { db, migrate } = require('@pubsweet/db-manager')
const logger = require('@pubsweet/logger')

const dbCleaner = async options => {
  await db.raw('DROP SCHEMA public CASCADE;')
  await db.raw('CREATE SCHEMA public;')
  await db.raw('GRANT ALL ON SCHEMA public TO public;')
  await migrate(options)
  logger.info('Dropped all tables and ran all migrations')
  return true
}

module.exports = dbCleaner
