const path = require('path')
const fetch = require('isomorphic-fetch')
const fs = require('fs-extra')
const logger = require('@pubsweet/logger')
const dbPath = require('./db-path')

const httpDbExists = async url => {
  try {
    await fetch(url)
    return true
  } catch (e) {
    logger.debug('Error requesting DB:', e)
    return false
  }
}

const dbExists = async () => {
  if (/^http/.test(dbPath)) {
    return httpDbExists()
  }

  const dbCheckPath = path.join(dbPath, 'CURRENT')
  return fs.pathExists(dbCheckPath)
}

module.exports = async () => {
  logger.info(`Checking if database exists at path ${dbPath}.`)
  const exists = await dbExists()
  logger.info(`Database ${exists ? 'exists' : 'does not exist'}.`)
  return exists
}
