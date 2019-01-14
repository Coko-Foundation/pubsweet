const db = require('../db')
const logger = require('@pubsweet/logger')

module.exports = async () => {
  logger.info(`Checking if database tables exist.`)
  const { rows } = await db.raw(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
  `)
  const exists = rows.length
  logger.info(`Database tables ${exists ? 'exist' : 'do not exist'}.`)
  return exists
}
