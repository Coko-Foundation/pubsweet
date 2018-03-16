const logger = require('@pubsweet/logger')
const db = require('pubsweet-server/src/db')

module.exports = async clobber => {
  const { rows } = await db.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
  `)

  if (rows.length) {
    if (clobber) {
      logger.info('Overwriting existing database due to clobber option')
      await Promise.all(
        rows.map(row => db.query(`DROP TABLE ${row.table_name}`)),
      )
    } else {
      logger.error(
        'If you want to overwrite the database, set clobber option to true',
      )
      throw new Error('Target database already exists, not clobbering')
    }
  }

  await db.query('CREATE TABLE entities (id UUID PRIMARY KEY, data JSONB)')
}
