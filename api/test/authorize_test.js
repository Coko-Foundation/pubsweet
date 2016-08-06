const dbCleaner = require('./helpers/db_cleaner')
const User = require('../models/User')
const Collection = require('../models/Collection')
const Authorize = require('../models/Authorize')
const expect = require('chai').expect
const fixtures = require('./fixtures/fixtures')

const adminFixture = fixtures.adminUser
const userFixture = fixtures.user
const collectionFixture = fixtures.collection

describe.only('Authorize', function () {
  before(function () {
    return dbCleaner().then(function () {
      return new Collection(collectionFixture).save()
    })
  })

  describe('admin user', function () {
    it('can create fragments', function () {
      var user = new User(adminFixture)
      return user.save().then(function (user) {
        return Authorize.can(user.id, 'create', '/api/collections/1/fragments')
      }).then(function (permission) {
        expect(permission).to.equal(true)
      })
    })
  })

  describe('user without a team', function () {
    it('can not create a fragment', function () {
      var user = new User(userFixture)
      return user.save().then(function (user) {
        return Authorize.can(user.id, 'create', '/api/collections/1/fragments')
      }).then(function (permission) {
        expect(permission).to.equal(false)
      })
    })
  })
})
