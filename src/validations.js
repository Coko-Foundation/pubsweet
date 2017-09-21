const Joi = require('joi')
const config = require('config')
const schemas = require('pubsweet-server/src/models/validations')
const _ = require('lodash/fp')

const userSchema = Joi.object({
  username: _.get('user.username', schemas) || Joi.string().required(),
  email: _.get('user.email', schemas) || Joi.string().email().required(),
  password: _.get('user.password', schemas) || Joi.string().min(8).max(60).required(),
  admin: Joi.boolean().optional()
})

const schema = Joi.object({
  dbManager: Joi.object({
    user: userSchema.required(),
    collection: _.get('collection.title', schemas) || Joi.string().optional()
  }).required(),
  'pubsweet-server': Joi.object({
    dbPath: Joi.string().required()
  }).required()
})

module.exports = {
  validateConfig: function validateConfig () {
    const result = Joi.validate(config, schema, { allowUnknown: true })
    if (result.error) throw result.error
    return null
  },
  validateUser: function validateUser (userData) {
    const result = Joi.validate(userData, userSchema, { allowUnknown: true })
    if (result.error) throw result.error
    return null
  }
}
