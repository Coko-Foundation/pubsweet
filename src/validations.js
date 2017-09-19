const Joi = require('joi')
const config = require('config')

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.email().required(),
  password: Joi.string().required()
})

const schema = Joi.object({
  dbManager: Joi.object({
    user: userSchema.required(),
    collection: Joi.string().optional()
  }).required(),
  'pubsweet-server': Joi.object({
    dbPath: Joi.string().required()
  }).required()
})

module.exports = {
  validateConfig: function validateConfig () {
    const result = Joi.validate(config, schema, { allowUnknown: true })
    if (result.error) throw result.error

    const dbPath = result.value['pubsweet-server'].dbPath
    if (/^http/.test(dbPath)) {
      result.value['pubsweet-server'].dbPath = (dbPath + '/').replace(/\/\/$/, '/') + process.env.NODE_ENV
    } else {
      result.value['pubsweet-server'].dbPath = path.join(dbPath, process.env.NODE_ENV)
    }

    config = result.value
  }
}
