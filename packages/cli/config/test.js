const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: {
      database: global.__testDbName || 'test',
    },
    secret: 'not very secret',
    uploads: path.join(__dirname, '..', '..', '..', 'uploads'),
  },
}
