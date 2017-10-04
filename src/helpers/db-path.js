const path = require('path')
const config = require('config')
const dbPath = config.get('pubsweet-server.dbPath')

const getPath = () => /^http/.test(dbPath)
  ? (dbPath + '/').replace(/\/\/$/, '/')
  : path.join(dbPath, process.env.NODE_ENV)

module.exports = getPath
