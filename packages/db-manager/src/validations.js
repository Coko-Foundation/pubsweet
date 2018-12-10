const Joi = require('joi')

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .max(60)
    .required(),
  admin: Joi.boolean().optional(),
})

const setupDbSchema = userSchema.keys({
  clobber: Joi.boolean().optional(),
})

module.exports = {
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
