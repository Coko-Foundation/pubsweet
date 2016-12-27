'use strict'
const Model = require('./Model')
const Fragment = require('./Fragment')
const Joi = require('joi')

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
    options.filter = options.filter || (() => Promise.resolve(true))

    if (!this.fragments) { return [] }

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
    if (this.fragments) {
      this.fragments.push(fragment)
    } else {
      this.fragments = [fragment]
    }
  }
}

Collection.type = 'collection'

Collection.schema = Joi.object().keys({
  id: Joi.string().guid().required(),
  type: Joi.string().required(),
  title: Joi.string(),
  rev: Joi.string(),
  owners: Joi.array().items(Joi.string().guid()),
  fragments: Joi.array().items(Joi.string().guid())
})

module.exports = Collection
