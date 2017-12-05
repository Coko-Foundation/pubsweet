const Joi = require('joi')
const config = require('config')
let appValidations
try {
  appValidations = require(config.validations)
} catch (err) {
  appValidations = []
}
const schemas = require('pubsweet-server/src/models/validations')(
  appValidations,
)
const _ = require('lodash/fp')

const userSchema = Joi.object({
  username: _.get('user.username', schemas) || Joi.string().required(),
  email:
    _.get('user.email', schemas) ||
    Joi.string()
      .email()
      .required(),
  password:
    _.get('user.password', schemas) ||
    Joi.string()
      .min(8)
      .max(60)
      .required(),
  admin: Joi.boolean().optional(),
})

const setupDbSchema = userSchema.keys({
  clobber: Joi.boolean().optional(),
})

const serverSchema = Joi.object({
  dbPath: Joi.string().required(),
})

module.exports = {
  validateServerConfig: function validateServerConfig(serverConfig) {
    const result = Joi.validate(serverConfig, serverSchema, {
      allowUnknown: true,
    })
    if (result.error) throw result.error
    return null
  },
  validateSetupDbConfig: function validateSetupDbConfig(setupDbConfig) {
    const result = Joi.validate(setupDbConfig, setupDbSchema, {
      allowUnknown: true,
    })
    if (result.error) throw result.error
    return null
  },
  validateUser: function validateUser(userData) {
    const result = Joi.validate(userData, userSchema, { allowUnknown: true })
    if (result.error) throw result.error
    return null
  },
}
