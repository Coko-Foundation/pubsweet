'use strict'

const createDb = require('../../src/db')
const logger = require('../../src/logger')

let dbCleaner = async () => {
  await global.db.destroy()

  global.db = createDb()

  const info = await global.db.info()

  logger.info('Created database', info)
}

module.exports = dbCleaner
