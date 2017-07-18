const path = require('path')
const blogmode = require('authsome/src/modes/blog')
const Joi = require('joi')

module.exports = {
  'pubsweet-server': {
    dbPath: process.env.PUBSWEET_DB || path.join(__dirname, '..', 'api', 'db'),
    API_ENDPOINT: '/api',
    sse: process.env.PUBSWEET_SSE
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
    components: require('./components.json')
  },
  validations: {
    fragment: {
      kind: Joi.string(),
      published: Joi.bool(),
      published_at: Joi.string(),
      source: Joi.any(),
      presentation. Joi.string()
    }
  }
}
