const config = require('config')
const { validateServerConfig } = require('./validations')

validateServerConfig(config.get('pubsweet-server'))

module.exports = {
  setupDb: require('./setup-db/'),
  addUser: require('./add-user/'),
  dbExists: require('./helpers/db-exists.js'),
}
