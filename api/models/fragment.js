'use strict'
const Model = require('./model').Model
// const db = require('./model').db

class Fragment extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'fragment'
    this.title = properties.title
  }
}

Fragment.type = 'fragment'

module.exports = Fragment
