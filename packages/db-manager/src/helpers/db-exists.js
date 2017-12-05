const path = require('path')
const fetch = require('isomorphic-fetch')
const fs = require('fs-extra')
const logger = require('@pubsweet/logger')
const getDbPath = require('./db-path')
const config = require('config')

const httpDbExists = async url => {
  try {
    const response = await fetch(url)
    return response.status === 200
  } catch (e) {
    logger.debug('Error requesting DB:', e)
    return false
  }
}

const dbExists = async dbPath => {
  if (config.get('pubsweet-server').adapter === 'memory') {
    // in memory databases are unique each time
    return false
  }

  if (/^http/.test(dbPath)) {
    return httpDbExists(dbPath)
  }

  const dbCheckPath = path.join(dbPath, 'CURRENT')
  return fs.pathExists(dbCheckPath)
}

module.exports = async () => {
  logger.info(`Checking if database exists at ${getDbPath()}.`)
  const exists = await dbExists(getDbPath())
  logger.info(`Database ${exists ? 'exists' : 'does not exist'}.`)
  return exists
}
