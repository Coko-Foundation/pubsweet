const logger = require('@pubsweet/logger')
const db = require('../db')
const migrate = require('./migrate')

const createTables = async clobber => {
  const { rows } = await db.raw(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = current_schema
  `)

  if (rows.length) {
    if (clobber) {
      logger.info('Overwriting existing database due to clobber option')
      // TODO this is dangerous, change it
      const dropQuery = rows
        .map(row => `DROP TABLE "${row.tablename}" CASCADE`)
        .join(';')
      await db.raw(dropQuery)
    } else {
      logger.error(
        'If you want to overwrite the database, set clobber option to true',
      )
      throw new Error('Target database already exists, not clobbering')
    }
  }

  // run migrations
  await migrate()

  const { rows: countRows } = await db.raw(`
    SELECT COUNT(*)
    FROM pg_tables
    WHERE schemaname = current_schema AND tablename = 'entities'
  `)

  // fallback if no entities table (which implies old version of server)
  if (countRows[0].count === '0') {
    await db.raw('CREATE TABLE entities (id UUID PRIMARY KEY, data JSONB)')
  }
}

module.exports = createTables
