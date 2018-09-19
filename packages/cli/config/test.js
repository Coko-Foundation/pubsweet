const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: {
      database: global.__testDbName || 'test',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
    secret: 'not very secret',
    uploads: path.join(__dirname, '..', '..', '..', 'uploads'),
  },
}
