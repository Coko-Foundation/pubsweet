const config = require('config')
const { validateServerConfig } = require('./validations')

validateServerConfig(config.get('pubsweet-server'))

module.exports = {
  setupDb: require('./setup-db'),
  addUser: require('./add-user'),
  addCollection: require('./add-collection'),
  dbExists: require('./helpers/db-exists'),
}
