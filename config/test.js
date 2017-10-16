const testMode = require('../test/helpers/authsome_mode')
const Joi = require('joi')
const winston = require('winston')

module.exports = {
  'pubsweet-server': {
    // disable logging in tests
    logger: winston,
    sse: false
  },
  validations: {
    fragment: {
      source: Joi.string(),
      kind: Joi.string(),
      title: Joi.string(),
      presentation: Joi.string(),
      published: Joi.boolean(),
      filtered: Joi.string()
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
