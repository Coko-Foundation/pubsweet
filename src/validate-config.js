'use strict'

const Joi = require('joi')

const schema = Joi.string().valid('winston', 'bunyan').optional().default('console')

module.exports = function validateConfig (config) {
  const result = Joi.validate(config, schema)
  if (result.error) throw result.error
  return result.value
}
