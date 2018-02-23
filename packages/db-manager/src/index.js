module.exports = {
  createTables: require('./commands/create-tables'),
  setupDb: require('./commands/setup-db'),
  addUser: require('./commands/add-user'),
  addCollection: require('./commands/add-collection'),
  dbExists: require('./helpers/db-exists'),
}
