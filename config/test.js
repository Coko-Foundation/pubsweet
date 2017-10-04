const testMode = require('../test/helpers/authsome_mode')
const Joi = require('joi')

module.exports = {
  'pubsweet-server': {
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
      published: Joi.boolean(),
      nonPublicProperty: Joi.string(),
      filtered: Joi.string()
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
