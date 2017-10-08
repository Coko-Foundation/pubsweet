const testMode = require('../test/helpers/authsome_mode')
const Joi = require('joi')

module.exports = {
  'pubsweet-server': {
    // disable logging in tests
    logger: {
      error: () => false,
      warn: () => false,
      info: () => false,
      debug: () => false
    },
    sse: false
  },
  validations: {
    fragment: {
      source: Joi.string(),
      kind: Joi.string(),
      title: Joi.string(),
      presentation: Joi.string(),
      published: Joi.boolean()
    },
    collection: {
      published: Joi.boolean(),
      nonPublicProperty: Joi.string(),
      filtered: Joi.string(),
      created: Joi.date().default(Date.now, 'creation time'),
      title: Joi.string()
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
