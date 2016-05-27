'use strict'
const _ = require('lodash')
const Model = require('./Model')

class Collection extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'collection'
    this.title = properties.title
    this.id = 1
  }

  // Gets fragments in a collection, supports filtering by boolean properties
  // e.g. collection.getFragments({filter: 'published'})
  getFragments (options) {
    options = options || {}
    if (!this.fragments) { return [] }
    var fragments = this.fragments.map(function (id) {
      return db.get(id)
    })

    return Promise.all(fragments).then(function (fragments) {
      return fragments.filter(function (fragment) {
        if (options.filter) {
          return _.some(_.map(options.filter, function (value, key) {
            return fragment[key] === value
          }))
        } else {
          return fragment
        }
      })
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
