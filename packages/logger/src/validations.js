const Joi = require('@hapi/joi')

const schema = Joi.object({
  error: Joi.func().required(),
  warn: Joi.func().required(),
  debug: Joi.func().required(),
  info: Joi.func().required(),
}).optional()

module.exports = {
  validateConfig: function validateConfig(config) {
    const result = Joi.validate(config, schema, { allowUnknown: true })
    if (result.error) throw result.error
    return result.value
  },
}
