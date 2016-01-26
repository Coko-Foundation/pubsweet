'use strict'
const Base = require('./base').Base

class Collection extends Base {
  constructor (properties) {
    super()
    this.type = 'collection'
    this.title = properties.title
  }
}

Collection.type = 'collection'

module.exports = Collection
