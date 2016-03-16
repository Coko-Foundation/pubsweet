'use strict'
const Model = require('./model')

class Fragment extends Model {
  constructor (properties) {
    super(properties)
    this.type = this.type || 'fragment'
    this.title = properties.title
    debugger
  }
}

Fragment.type = 'fragment'

module.exports = Fragment
