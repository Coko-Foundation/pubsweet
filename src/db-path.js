const path = require('path')

module.exports = appPath => {
  // load dbPath from config if it is set, otherwise use default
  require('./load-config')(path.resolve(path.join(appPath, 'config')))

  const cfPath = path.resolve(path.join(appPath, 'node_modules', 'pubsweet-server', 'config.js'))
  const config = require(cfPath)
  const dbPathCfg = require(cfPath)['pubsweet-server'].dbPath

  if (/^http/.test(dbPathCfg)) return dbPathCfg

  const dbPathBase = dbPathCfg || path.join(appPath, 'api', 'db')

  const dbPath = path.join(dbPathBase, process.env.NODE_ENV)
  return dbPath
}
