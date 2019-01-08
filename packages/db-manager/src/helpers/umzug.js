const logger = require('@pubsweet/logger')
const db = require('../db')
const Umzug = require('umzug')
const fs = require('fs-extra')
const path = require('path')
const tmp = require('tmp')
const { promisify } = require('util')
const storage = require('./umzugStorage')

const makeTempDir = promisify(tmp.dir)

// load SQL files as migrations
const sqlResolver = filePath => ({
  up: async db => {
    const fileContents = await fs.readFile(filePath, 'utf-8')
    return db.raw(fileContents)
  },
})

const getUmzug = async migrationsPaths => {
  // collect up all migrations to be run
  const tempDir = await makeTempDir({
    prefix: 'migrations-',
    unsafeCleanup: true,
    dir: process.cwd(),
  })

  // filter out any migration paths that do not exist
  await Promise.all(
    migrationsPaths.map(async migrationPath => {
      if (await fs.exists(migrationPath)) {
        await fs.copy(migrationPath, tempDir)
      }
    }),
  )

  return new Umzug({
    storage,
    logging: logger.debug.bind(logger),
    migrations: {
      path: tempDir,
      params: [db],
      pattern: /\d+-[\w-]+\.(js|sql)/,
      customResolver: filePath => {
        if (path.extname(filePath) === '.sql') {
          return sqlResolver(filePath)
        }
        return require(filePath)
      },
    },
  })
}

module.exports = getUmzug
