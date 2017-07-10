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
    'login-redirect': '/manage/posts'
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
    },
    'fail-redirect': '/login'
  },
  pubsweet: {
    components: [
      'pubsweet-component-blog',
      'pubsweet-component-login',
      'pubsweet-component-manage',
      'pubsweet-component-pepper-theme',
      'pubsweet-component-posts-manager',
      'pubsweet-component-signup'
    ]
  }
  // validations: {
  //   fragment: {
  //     published: Joi.bool()
  //   }
  // }
}
