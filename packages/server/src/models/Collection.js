const Model = require('./Model')
const without = require('lodash/without')

class Collection extends Model {
  constructor(properties) {
    super(properties)
    this.type = 'collection'
    this.fragments = this.fragments || []
    this.owners = this.owners || []
  }

  async save() {
    this.fragments = this.fragments.map(fragment => fragment.id || fragment)
    return super.save()
  }

  // Gets fragments in a collection, supports filtering by function e.g.
  // collection.getFragments({filter: fragment => {Authorize.can(req.user, 'read', fragment)})
  getFragments(options) {
    const { Fragment } = require('pubsweet-server/src/models')
    options = options || {}
    options.filter = options.filter || (() => Promise.resolve(true))

    const fragments = Promise.all(this.fragments.map(id => Fragment.find(id)))

    return fragments
      .then(fragments => {
        const filters = Promise.all(
          fragments.map(fragment =>
            options.filter(fragment).catch(() => false),
          ),
        )
        return Promise.all([fragments, filters])
      })
      .then(([fragments, filters]) =>
        fragments.filter(fragment => filters.shift()),
      )
  }

  addFragment(fragment) {
    const { Fragment } = require('pubsweet-server/src/models')
    this.fragments = this.fragments.map(fragment => {
      if (typeof fragment === 'object') {
        return fragment
      }
      return new Fragment({ id: fragment })
    })
    this.fragments.push(fragment)
  }

  removeFragment(fragment) {
    this.fragments = this.fragments.map(fragment => {
      if (typeof fragment === 'object') {
        return fragment.id
      }
      return fragment
    })
    this.fragments = without(this.fragments, fragment.id)
  }

  async delete() {
    const { model: Team } = require('@pubsweet/model-team')

    await Team.deleteAssociated(this.type, this.id)
    return super.delete()
  }
}

Collection.type = 'collection'

module.exports = Collection
