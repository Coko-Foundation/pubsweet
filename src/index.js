process.env.SUPPRESS_NO_CONFIG_WARNING = true
const config = require('config')
const { validateServerConfig } = require('./validations')

process.env.PUBSWEET_BACKEND_SILENT = true

validateServerConfig(config.get('pubsweet-server'))

module.exports = {
  setupDb: require('./setup-db/'),
  addUser: require('./add-user/'),
  dbExists: require('./helpers/db-exists.js') 
}
