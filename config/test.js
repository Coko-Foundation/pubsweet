const blogmode = require('authsome/src/modes/blog')

module.exports = {
  'pubsweet-backend': {
    dbPath: './db/',
    "API_ENDPOINT": "/api"
  },
  authsome: {
    mode: blogmode,
    teams: {
      teamContributors: {
        name: 'Contributors',
        permissions: 'create'
      },
      teamCoauthors: {
        name: 'Coauthors',
        permissions: 'update'
      }
    }
  }
}
