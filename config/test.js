const blogmode = require('authsome/src/modes/blog')
const Joi = require('joi')

console.log('SETTING is', global.SSE)
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
