const dbCleaner = require('./helpers/db_cleaner')
const User = require('../models/User')
const expect = require('expect.js')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user

describe('User', function () {
  before(function () {
    return dbCleaner()
  })

  it('returns true if passwords match', function () {
    var user = new User(userFixture)

    expect(user.validPassword(userFixture.password)).to.eql(true)
    expect(user.validPassword('wrongpassword')).to.eql(false)
  })

  it('validates passwords correctly after saving to db', function () {
    var user = new User(userFixture)

    return user.save().then(function (user) {
      return User.findByUsername(user.username)
    }).then(function (user) {
      expect(user.validPassword(userFixture.password)).to.eql(true)
      expect(user.validPassword('wrongpassword')).to.eql(false)
    })
  })
})
