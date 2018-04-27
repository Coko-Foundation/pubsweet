const Joi = require('joi')

module.exports = {
  fragment: [
    {
      fragmentType: Joi.valid('blogpost').required(),
      source: Joi.string(),
      kind: Joi.string(),
      title: Joi.string(),
      presentation: Joi.string(),
      published: Joi.boolean(),
      filtered: Joi.string(),
      owners: Joi.array().items(Joi.string().guid()),
    },
    {
      fragmentType: Joi.valid('file').required(),
      path: Joi.string().required(),
      owners: Joi.array().items(Joi.string().guid()),
    },
  ],
  collection: {
    published: Joi.boolean(),
    nonPublicProperty: Joi.string(),
    filtered: Joi.string(),
    created: Joi.date().default(Date.now, 'creation time'),
    title: Joi.string(),
    owners: Joi.array().items(Joi.string().guid()),
  },
}
