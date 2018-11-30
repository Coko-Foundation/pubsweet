const Joi = require('joi')

module.exports = {
  collection: {
    published: Joi.boolean(),
    nonPublicProperty: Joi.string(),
    filtered: Joi.string(),
    created: Joi.date().default(Date.now, 'creation time'),
    title: Joi.string(),
  },
}
