const path = require('path')
const fs = require('fs-extra')

module.exports = (appPath, obj) => {
  const serverdir = path.resolve(path.join(appPath, 'node_modules', 'pubsweet-server'))
  fs.ensureDirSync(serverdir)
  const configpath = path.join(serverdir, 'config.js')
  const config = `
const path = require('path')
let cfg = {}

try {
  cfg = require(path.join('./config', process.env.NODE_ENV + '.js'))
} catch (e) {

}

const patch = JSON.parse('${JSON.stringify(obj)}')
module.exports = Object.assign(cfg, patch)
`
  fs.writeFileSync(configpath, config)
}
