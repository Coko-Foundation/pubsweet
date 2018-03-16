const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: {
      database: global.__testDbName || 'test',
    },
    ignoreTerminatedConnectionError: true,
    port: 4000,
    secret: 'test',
    sse: false,
    uploads: 'uploads',
  },
  authsome: {
    mode: path.resolve(__dirname, '..', 'src', 'index'),
    teams: require('../test/teams-config.js'),
  },
}
