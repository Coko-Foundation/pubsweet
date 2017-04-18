'use strict'

const PouchDB = require('../../src/db')
const logger = require('../../src/logger')

let dbCleaner = async () => {
  let dbName = global.db.name

  await global.db.destroy()

  global.db = new PouchDB(dbName, { adapter: 'memory' })

  const info = await global.db.info()

  logger.info('Created database', info)
}

module.exports = dbCleaner
