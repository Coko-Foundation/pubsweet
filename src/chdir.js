const fs = require('fs-extra')
const path = require('path')
const loadConfig = require('../src/load-config')
const logger = require('pubsweet-logger')

module.exports = async appPath => {
  logger.info('Changing working directory to', appPath)

  await fs.ensureDir(appPath)
  process.chdir(appPath)
  loadConfig(path.resolve(appPath, './config'))

  logger.info('Changed working directory')
}
