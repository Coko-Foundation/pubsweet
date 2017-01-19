const dbCleaner = require('./helpers/db_cleaner')
const User = require('../src/models/User')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user

describe('User', function () {
  beforeAll(function () {
    return dbCleaner()
  })

  it('returns true if passwords match', function () {
    var user = new User(userFixture)

    expect(user.validPassword(userFixture.password)).toEqual(true)
    expect(user.validPassword('wrongpassword')).toEqual(false)
  })

  it('validates passwords correctly after saving to db', function () {
    var user = new User(userFixture)

    return user.save().then(function (user) {
      return User.findByUsername(user.username)
    }).then(function (user) {
      expect(user.validPassword(userFixture.password)).toEqual(true)
      expect(user.validPassword('wrongpassword')).toEqual(false)
    })
  })

  it('raises an error if trying to save a non-unique user', () => {
    var user = new User(userFixture)

    return user.save().catch(err => {
      expect(err.name).toEqual('ConflictError')
    })
  })
})
