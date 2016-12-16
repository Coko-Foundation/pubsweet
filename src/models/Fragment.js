'use strict'
const Model = require('./Model')
const Joi = require('joi')

class Fragment extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'fragment'
    this.title = properties.title
  }
}

Fragment.type = 'fragment'

Fragment.schema = Joi.object().keys({
  id: Joi.string().guid().required(),
  type: Joi.string().required(),
  title: Joi.string(),
  rev: Joi.string(),
  owners: Joi.array().items(Joi.string().guid()),
  // TODO: These are emergent, any way we can standardize?
  source: Joi.string(),
  kind: Joi.string(),
  presentation: Joi.string(),
  published: Joi.boolean()

})

module.exports = Fragment
