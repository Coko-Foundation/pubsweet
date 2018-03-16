const Joi = require('joi')

module.exports = {
  collection: {
    title: Joi.string(),
    status: Joi.string(),
  },
  fragment: {
    version: Joi.number(),
  },
}
