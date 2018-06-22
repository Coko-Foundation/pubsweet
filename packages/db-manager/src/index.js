module.exports = {
  createTables: require('./commands/create-tables'),
  setupDb: require('./commands/setup-db'),
  addUser: require('./commands/add-user'),
  addCollection: require('./commands/add-collection'),
  addFragment: require('./commands/add-fragment'),
  dbExists: require('./helpers/db-exists'),
}
