const dbCleaner = require('./helpers/db_cleaner')
const User = require('../models/User')
const Collection = require('../models/Collection')
const Authorize = require('../models/Authorize')
const expect = require('expect.js')
const fixtures = require('./fixtures/fixtures')

const adminFixture = fixtures.adminUser
const userFixture = fixtures.user
const collectionFixture = fixtures.collection

describe('Authorize', function () {
  before(function () {
    return dbCleaner()
  })

  describe.only('admin user', function () {
    before(function () {
      return new Collection(collectionFixture).save()
    })

    it('can create fragments', function () {
      var user = new User(adminFixture)
      return user.save().then(function (user) {
        return Authorize.can(user.id, 'create', '/api/collections/1/fragments')
      }).then(function (permission) {
        expect(permission).to.eql(true)
      })
    })
  })

  describe('user without a team', function () {
    it('can not create a fragment', function () {
      var user = new User(userFixture)
      return user.save().then(function (user) {
        var permission = Authorize.can(user.id, 'create', '/api/collections/1/fragments')
        console.log('PERMISSION', permission)
        expect(permission).to.eql(false)
      })
    })
  })
})
