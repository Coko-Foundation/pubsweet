const path = require('path')
const logger = require('./logger')
const httpdb = require('./http-db')

module.exports = appPath => {
  // load dbPath from config if it is set, otherwise use default
  require('./load-config')(path.resolve(path.join(appPath, 'config')))

  let dbPathBase = path.join(appPath, 'api', 'db')

  try {
    const cfPath = path.resolve(path.join(appPath, 'node_modules', 'pubsweet-server', 'config.js'))
    const config = require(cfPath)
    const dbPathCfg = config['pubsweet-server'].dbPath
    dbPathBase = dbPathCfg || dbPathBase
    logger.info('DB path loaded from config')
  } catch (e) {
    logger.info('No config found - using default DB path', e)
  }

  if (httpdb.is(dbPathBase)) return (dbPathBase + '/').replace(/\/\/$/, '/')

  const dbPath = path.join(dbPathBase, process.env.NODE_ENV)
  return dbPath
}
