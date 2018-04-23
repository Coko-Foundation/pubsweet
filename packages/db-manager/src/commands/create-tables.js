const logger = require('@pubsweet/logger')
const db = require('pubsweet-server/src/db')
const Umzug = require('umzug')
const fs = require('fs-extra')
const path = require('path')
const tmp = require('tmp')
const { promisify } = require('util')
const storage = require('../helpers/umzugStorage')
const getMigrationPaths = require('../helpers/migrationPaths')

const makeTempDir = promisify(tmp.dir)

// load SQL files as migrations
const sqlResolver = filePath => ({
  up: async db => {
    const fileContents = await fs.readFile(filePath, 'utf-8')
    return db.query(fileContents)
  },
})

const createTables = async clobber => {
  const { rows } = await db.query(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = current_schema
  `)

  if (rows.length) {
    if (clobber) {
      logger.info('Overwriting existing database due to clobber option')
      await Promise.all(
        // TODO this is dangerous, change it
        rows.map(row => db.query(`DROP TABLE ${row.tablename}`)),
      )
    } else {
      logger.error(
        'If you want to overwrite the database, set clobber option to true',
      )
      throw new Error('Target database already exists, not clobbering')
    }
  }

  // collect up all migrations to be run
  const tempDir = await makeTempDir({
    prefix: 'migrations-',
    unsafeCleanup: true,
  })

  const migrationPaths = getMigrationPaths()
  await Promise.all(
    migrationPaths.map(migrationPath => fs.copy(migrationPath, tempDir)),
  )

  const migrator = new Umzug({
    storage,
    logging: logger.debug.bind(logger),
    migrations: {
      path: tempDir,
      params: [db],
      pattern: /\d+-\w+\.(js|sql)/,
      customResolver: filePath => {
        if (path.extname(filePath) === '.sql') {
          return sqlResolver(filePath)
        }
        return require(filePath)
      },
    },
  })

  // run migrations
  await migrator.up()
}

module.exports = createTables
