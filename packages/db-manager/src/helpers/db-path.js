const config = require('config')

const dbPath = config.get('pubsweet-server.dbPath')

const getPath = () =>
  /^http/.test(dbPath) ? `${dbPath}/`.replace(/\/\/$/, '/') : dbPath

module.exports = getPath
