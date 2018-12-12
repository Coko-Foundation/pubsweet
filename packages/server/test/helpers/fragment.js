const fixtures = require('../fixtures/fixtures')
const { Fragment } = require('../../src/models')
const assign = require('lodash/assign')

module.exports = (opts, collection) => {
  const fragment = new Fragment(fixtures.fragment)
  assign(fragment, opts)

  return fragment.save().then(() => {
    collection.addFragment(fragment)
    return collection.save().then(() => fragment)
  })
}
