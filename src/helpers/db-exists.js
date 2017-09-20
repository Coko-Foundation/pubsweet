const path = require('path')
require('isomorphic-fetch')
const fs = require('fs-extra')
const logger = require('@pubsweet/logger')
const config = require('config')
const dbPath = require('./db-path')

const httpDbExists = async url => {
  try {
    await fetch(url)
    return true
  } catch (e) {
    logger.debug('Error requesting DB:', err)
    return false
  }
}

const dbExists = async () => {
  if (/^http/.test(dbPath)) {
    return await httpDbExists()
  }

  const dbCheckPath = path.join(dbPath, 'CURRENT')
  return await fs.pathExists(dbCheckPath)
} 

module.exports = async () => {
  logger.info(`Checking if database exists at path ${dbPath}.`)
  const exists = await dbExists()
  logger.info(`Database ${exists ? 'exists' : 'does not exist'}.`)
  return exists
}
