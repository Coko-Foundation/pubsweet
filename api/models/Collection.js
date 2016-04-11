'use strict'
const _ = require('lodash')
const Model = require('./Model')

class Collection extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'collection'
    this.title = properties.title
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
      this.fragments.push(fragment._id)
    } else {
      this.fragments = [fragment._id]
    }
  }

  static get () {
  // Idempotently create indexes in datastore
    return db.createIndex({
      index: {
        fields: ['type']
      }
    }).then(function (result) {
      return db.find({selector: {type: 'collection'}}).then(function (results) {
        console.log(results.docs[0])
        return new this(results.docs[0])
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.error(err)
    })
  }
}

Collection.type = 'collection'

module.exports = Collection
