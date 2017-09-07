const testMode = require('../test/helpers/authsome_mode')
const Joi = require('joi')

module.exports = {
  'pubsweet-server': {
    'API_ENDPOINT': '/api',
    sse: false
  },
  validations: {
    fragment: {
      source: Joi.string(),
      kind: Joi.string(),
      presentation: Joi.string(),
      published: Joi.boolean()
    },
    collection: {
      published: Joi.boolean()
    }
  },
  authsome: {
    mode: testMode,
    teams: {
      teamContributors: {
        name: 'Contributors',
        permissions: 'POST'
      },
      teamCoauthors: {
        name: 'Coauthors',
        permissions: 'PATCH'
      }
    }
  }
}
