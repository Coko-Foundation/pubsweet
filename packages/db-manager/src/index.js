module.exports.db = require('./db')
module.exports.createTables = require('./commands/create-tables')
module.exports.setupDb = require('./commands/setup-db')
module.exports.migrate = require('./commands/migrate')
module.exports.addUser = require('./commands/add-user')
module.exports.dbExists = require('./helpers/db-exists')
