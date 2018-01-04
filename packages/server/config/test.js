const path = require('path')
const winston = require('winston')

module.exports = {
  'pubsweet-server': {
    logger: new winston.Logger({ level: 'warn' }),
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
