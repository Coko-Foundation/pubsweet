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
    this.id = 1
  }

  // Gets fragments in a collection, supports filtering by properties
  // e.g. collection.getFragments({filter: {published: true, owner: req.user}})
  getFragments (options) {
    options = options || {}
    if (!this.fragments) { return [] }
    var fragments = this.fragments.map(function (id) {
      return Fragment.find(id)
    })

    var filteredFragments

    return Promise.all(fragments).then(function (fragments) {
      return fragments.filter(function (fragment) {
        if (options.filter) {
          fragment = _.some(_.map(options.filter, function (value, key) {
            return fragment[key] === value
          }))
        }
        return fragment
      })
    }).then(function (fragments) {
      filteredFragments = fragments

      return Promise.all(fragments.map(function (fragment) {
        return User.find(fragment.owner)
      }))
    }).then(function (owners) {
      return owners.reduce(function (map, owner) {
        map[owner.id] = owner.username
        return map
      }, {})
    }).then(function (ownersById) {
      return filteredFragments.map(function (fragment) {
        fragment.owner = ownersById[fragment.owner]
        return fragment
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
