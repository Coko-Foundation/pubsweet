const dbCleaner = require('./helpers/db_cleaner')
const User = require('../models/User')
const Authorize = require('../models/Authorize')
const expect = require('expect.js')
const fixtures = require('./fixtures/fixtures')
const adminFixture = fixtures.adminUser

describe.only('Authorize', function () {
  before(function () {
    return dbCleaner()
  })

  it('returns true if user is an admin', function () {
    var user = new User(adminFixture)
    return user.save().then(function (user) {
      var permission = Authorize.can(user.id, 'api/collections/1/fragments', 'create')
      expect(permission).to.eql(true)
    })
  })
})
