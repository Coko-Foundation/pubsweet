const fs = require('fs-extra')
const path = require('path')
const loadConfig = require('../src/load-config')

module.exports = async appPath => {
  fs.ensureDirSync(appPath)
  process.chdir(appPath)
  loadConfig(path.resolve(appPath, './config'))
}
