const path = require('path')

module.exports = {
  'pubsweet-server': {
    db: {
      // temporary database name set by jest-environment-db
      database: global.__testDbName || 'test',
    },
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
    ignoreTerminatedConnectionError: true,
    enableExperimentalGraphql: true,
    port: 4000,
    secret: 'test',
    sse: false,
    uploads: 'uploads',
  },
  validations: path.join(__dirname, 'validations'),
  authsome: {
    mode: path.resolve(__dirname, '..', 'test', 'helpers', 'authsome_mode'),
    teams: {
      teamContributors: {
        name: 'Contributors',
        permissions: 'POST',
      },
      teamCoauthors: {
        name: 'Coauthors',
        permissions: 'PATCH',
      },
    },
  },
  pubsweet: {
    components: [
      '@pubsweet/model-user',
      '@pubsweet/model-team',
      '@pubsweet/model-blog',
      '@pubsweet/model-blogpost',
    ],
  },
}
