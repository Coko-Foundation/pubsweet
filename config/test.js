const blogmode = require('authsome/src/modes/blog')
const Joi = require('joi')

module.exports = {
  'pubsweet-backend': {
    dbPath: './db/',
    'API_ENDPOINT': '/api'
  },
  validations: {
    fragment: {
      source: Joi.string(),
      kind: Joi.string(),
      presentation: Joi.string(),
      published: Joi.boolean()
    }
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
