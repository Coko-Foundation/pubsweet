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
    typeDefs: `
      extend type Collection {
        collectionType: String
        created: String
        title: String
        status: String
      }
    `,
  },
  authsome: {
    mode: path.resolve(__dirname, '..', 'src', 'index'),
    teams: require('../test/teams-config.js'),
  },
  validations: path.join(__dirname, 'validations'),
}
