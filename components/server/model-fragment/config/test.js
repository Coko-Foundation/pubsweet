const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: {
      // temporary database name set by jest-environment-db
      database: global.__testDbName || 'test',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
    port: 4000,
    secret: 'test',
    uploads: 'uploads',
  },
  authsome: {
    mode: path.resolve(__dirname, '..', 'test', 'helpers', 'authsome_mode'),
    teams: {},
  },
  pubsweet: {
    components: [
      '@pubsweet/model-user',
      '@pubsweet/model-team',
      '@pubsweet/model-fragment',
    ],
  },
}
