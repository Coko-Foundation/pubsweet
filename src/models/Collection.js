'use strict'
const Model = require('./Model')
const Fragment = require('./Fragment')
const logger = require('../logger')

class Collection extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'collection'
    this.fragments = this.fragments || []
  }

  updateProperties (properties) {
    // These properties are modified through setters
    delete properties.owners

    // FIXME: need to protect any other properties?

    logger.info('Updating properties to', properties)

    Object.assign(this, properties)
    return this
  }

  // Gets fragments in a collection, supports filtering by function e.g.
  // collection.getFragments({filter: fragment => {Authorize.can(req.user, 'read', fragment)})
  getFragments (options) {
    options = options || {}
    options.filter = options.filter || (() => Promise.resolve(true))

    var fragments = Promise.all(this.fragments.map((id) => Fragment.find(id)))

    return fragments.then(
      fragments => {
        let filters = Promise.all(
          fragments.map(
            fragment => options.filter(fragment).catch(() => false)
          )
        )
        return Promise.all([fragments, filters])
      }
    ).then(
      ([fragments, filters]) => fragments.filter(fragment => filters.shift())
    )
  }

  addFragment (fragment) {
    this.fragments = this.fragments.map(
      fragmentId => new Fragment({id: fragmentId})
    )
    this.fragments.push(fragment)
  }
}

Collection.type = 'collection'

module.exports = Collection
