const Joi = require('joi-browser')

module.exports = {
  fragment: {
    title: Joi.string(),
  },
  collection: {
    title: Joi.string(),
  },
}
