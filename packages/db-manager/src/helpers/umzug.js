const logger = require('@pubsweet/logger')
const db = require('../db')
const Umzug = require('umzug')
const fs = require('fs-extra')
const { extname, resolve } = require('path')
const tmp = require('tmp-promise')
const storage = require('./umzugStorage')

// Load SQL files as migrations
const sqlResolver = filePath => ({
  up: async db => {
    const fileContents = await fs.readFile(filePath, 'utf-8')
    return db.raw(fileContents)
  },
})

const getUmzug = async migrationsPaths => {
  // Collect up all migrations to be run
  const { path: tmpDir, cleanup } = await tmp.dir({
    prefix: '_migrations-',
    unsafeCleanup: true,
    dir: process.cwd(),
  })

  // Filter out any migration paths that do not exist
  await Promise.all(
    migrationsPaths.map(async migrationPath => {
      if (await fs.exists(migrationPath)) {
        // During tests, we want to collect coverage for migrations
        if (process.env.NODE_ENV === 'test') {
          const files = await fs.readdir(migrationPath)
          const symlinks = files.map(file =>
            fs.symlink(resolve(migrationPath, file), resolve(tmpDir, file)),
          )
          await Promise.all(symlinks)
        } else {
          await fs.copy(migrationPath, tmpDir)
        }
      }
    }),
  )

  const umzug = new Umzug({
    storage,
    logging: logger.debug.bind(logger),
    migrations: {
      path: tmpDir,
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
