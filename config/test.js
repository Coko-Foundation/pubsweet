module.exports = {
  'pubsweet-backend': {
    secret: 'TEST',
    dbPath: './db/'
  },
  authsome: {
    mode: 'blog',
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
