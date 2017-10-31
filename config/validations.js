const Joi = require('joi')

module.exports = {
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
}