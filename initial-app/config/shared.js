const path = require('path')
const blogmode = require('authsome/src/modes/blog')
// const Joi = require('joi')

module.exports = {
  'pubsweet-server': {
    dbPath: process.env.PUBSWEET_DB || path.join(__dirname, '..', 'api', 'db'),
    API_ENDPOINT: '/api'
  },
  'pubsweet-client': {
    theme: 'PepperTheme',
    'login-redirect': '/'
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
  },
  pubsweet: {
    components: [
      'pubsweet-component-signup',
      'pubsweet-component-login'
    ]
  }
  // validations: {
  //   fragment: {
  //     published: Joi.bool()
  //   }
  // }
}
