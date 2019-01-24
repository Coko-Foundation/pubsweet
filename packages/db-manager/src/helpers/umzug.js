const logger = require('@pubsweet/logger')
const db = require('../db')
const Umzug = require('umzug')
const fs = require('fs-extra')
const { extname } = require('path')
const tmp = require('tmp-promise')
const storage = require('./umzugStorage')

// load SQL files as migrations
const sqlResolver = filePath => ({
  up: async db => {
    const fileContents = await fs.readFile(filePath, 'utf-8')
    return db.raw(fileContents)
  },
})

const getUmzug = async migrationsPaths => {
  // collect up all migrations to be run
  const { path, cleanup } = await tmp.dir({
    prefix: '_migrations-',
    unsafeCleanup: true,
    dir: process.cwd(),
  })

  // filter out any migration paths that do not exist
  await Promise.all(
    migrationsPaths.map(async migrationPath => {
      if (await fs.exists(migrationPath)) {
        await fs.copy(migrationPath, path)
      }
    }),
  )
  const umzug = new Umzug({
    storage,
    logging: logger.debug.bind(logger),
    migrations: {
      path,
      params: [db],
      pattern: /\d+-[\w-]+\.(js|sql)/,
      customResolver: filePath => {
        if (extname(filePath) === '.sql') {
          return sqlResolver(filePath)
        }
        return require(filePath)
      },
    },
  })

  return { cleanup, umzug }
}

module.exports = getUmzug
