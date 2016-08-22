'use strict'
const _ = require('lodash')
const Model = require('./Model')
const Fragment = require('./Fragment')
const User = require('./User')

class Collection extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'collection'
    this.title = properties.title
  }

  // Gets fragments in a collection, supports filtering by function e.g.
  // collection.getFragments({filter: fragment => {Authorize.can(req.user, 'read', fragment)})
  getFragments (options) {
    options = options || {}
    if (!this.fragments) { return [] }
    var fragments = this.fragments.map(function (id) {
      return Fragment.find(id)
    })

    return Promise.all(fragments).then(fragments => {
      if (options.filter) {
        return fragments.filter(options.filter)
      } else {
        return fragments
      }
    })
  }

  addFragment (fragment) {
    if (this.fragments) {
      this.fragments.push(fragment)
    } else {
      this.fragments = [fragment]
    }
  }
}

Collection.type = 'collection'

module.exports = Collection
