const path = require('path')
const fs = require('fs-extra')
const httpdb = require('./http-db')
const logger = require('pubsweet-logger')

module.exports = async dbPath => {
  let exists

  if (httpdb.is(dbPath)) {
    logger.info('Checking whether', dbPath, 'exists')
    exists = await httpdb.exists(dbPath)
  } else {
    const dbCheckPath = path.join(dbPath, 'CURRENT')
    logger.info('Checking whether', dbCheckPath, 'exists')
    exists = await fs.pathExists(dbCheckPath)
  }

  return exists
}
