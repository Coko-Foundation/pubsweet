const path = require('path')
const winston = require('winston')

module.exports = {
  'pubsweet-server': {
    db: {
      // temporary database name set by jest-environment-db
      database: global.__testDbName || 'test',
    },
    ignoreTerminatedConnectionError: true,
    logger: new winston.Logger({
      level: 'warn',
      transports: [new winston.transports.Console()],
    }),
    port: 4000,
    secret: 'test',
    sse: false,
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
}
