const path = require('path')
const fs = require('fs-extra')
const logger = require('@pubsweet/logger')

const isHttpDb = path => /^http/.test(path)

const httpDbExists = async url => {
  try {
    await fetch(url)
    return true
  } catch (e) {
    logger.debug('Error requesting DB:', err)
    return false
  }
}

const dbExists = async dbPath => {
  if (isHttpDb) {
    return await httpDbExists(dbPath)
  }

  const dbCheckPath = path.join(dbPath, 'CURRENT')
  return await fs.pathExists(dbCheckPath)
} 

module.exports = async dbPath => {
  const exists = await dbExists(dbPath)
  logger.info(`Database ${exists ? 'exists' : 'does not exist'} at path ${dbPath}.`)
  return exists
}
