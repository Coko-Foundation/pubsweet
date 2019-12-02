const logger = require('@pubsweet/logger')
const db = require('../db')
const migrate = require('./migrate')

const createTables = async clobber => {
  const { rows } = await db.raw(`
    SELECT tablename, schemaname
    FROM pg_tables
    WHERE schemaname = 'public' OR schemaname = 'pgboss'
  `)

  if (rows.length) {
    if (clobber) {
      logger.info('Overwriting existing database due to clobber option')
      // TODO this is dangerous, change it
      let dropQuery = rows.map(
        row => `DROP TABLE ${row.schemaname}.${row.tablename} CASCADE`,
      )

      // Also delete the pgboss.job_state type
      dropQuery.push('DROP TYPE IF EXISTS pgboss.job_state')
      dropQuery = dropQuery.join('; ')

      await db.raw(dropQuery)
    } else {
      logger.error(
        'If you want to overwrite the database, set clobber option to true',
      )
      throw new Error('Target database already exists.')
    }
  }

  // run migrations
  await migrate()
}

module.exports = createTables
