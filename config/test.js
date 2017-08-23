const testMode = require('../test/helpers/authsome_mode')
const Joi = require('joi')

module.exports = {
  'pubsweet-server': {
    'API_ENDPOINT': '/api',
    sse: global.SSE || false
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
        permissions: 'create'
      },
      teamCoauthors: {
        name: 'Coauthors',
        permissions: 'update'
      }
    }
  }
}
