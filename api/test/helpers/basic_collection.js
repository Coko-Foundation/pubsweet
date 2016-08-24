const fixtures = require('../fixtures/fixtures')

module.exports = () => {
  return require(
    '../../setup-base'
  ).setup(
    fixtures.user, fixtures.collection
  )
}
