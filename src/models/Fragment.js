'use strict'
const Model = require('./Model')

class Fragment extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'fragment'
    this.title = properties.title
  }
}

Fragment.type = 'fragment'

module.exports = Fragment
