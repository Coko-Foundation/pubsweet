const fs = require('fs-extra')
const path = require('path')

module.exports = appPath => () => new Promise(
  resolve => {
    fs.mkdirsSync(appPath)
    process.chdir(appPath)
    require('../src/load-config')(path.resolve(appPath, './config'))
    resolve()
  }
)
