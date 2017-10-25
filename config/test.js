const path = require('path')
const Joi = require('joi')
const winston = require('winston')

module.exports = {
  'pubsweet-server': {
    logger: winston,
    secret: 'test',
    sse: false
  },
  validations: {
    fragment: [
      {
        fragmentType: Joi.valid('blogpost').required(),
        source: Joi.string(),
        kind: Joi.string(),
        presentation: Joi.string(),
        published: Joi.boolean(),
        filtered: Joi.string()
      },
      {
        fragmentType: Joi.valid('file').required(),
        path: Joi.string().required()
      }
    ],
    collection: {
      published: Joi.boolean(),
      nonPublicProperty: Joi.string(),
      filtered: Joi.string(),
      created: Joi.date().default(Date.now, 'creation time'),
      title: Joi.string()
    }
  },
  authsome: {
    mode: path.resolve(__dirname, '..', 'test', 'helpers', 'authsome_mode'),
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
