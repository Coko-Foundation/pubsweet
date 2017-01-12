const fixtures = require('../fixtures/fixtures')

module.exports = () => {
  return require(
    '../../src/setup-base'
  ).setup(
    fixtures.user, fixtures.collection
  )
}
