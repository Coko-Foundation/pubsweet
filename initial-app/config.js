const path = require('path')

module.exports = {
  secret: 'EXAMPLEDONTUSE',
  dbPath: path.join(__dirname, 'api', 'db'),
  API_ENDPOINT: '/api',
  theme: 'PepperTheme',
  routes: 'app/routes.jsx',
  navigation: 'app/components/Navigation/Navigation.jsx',
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
