module.exports = {
  secret: 'EXAMPLEDONTUSE',
  API_ENDPOINT: '/api',
  routes: 'app/routes.jsx',
  navigation: 'app/components/Navigation/Navigation.jsx',
  theme: 'pepper',
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
