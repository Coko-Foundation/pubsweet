const fixtures = require('../fixtures/fixtures')

module.exports = () =>
  require('../../src/setup-base').setup(fixtures.user, fixtures.collection)
