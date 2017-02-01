const dbCleaner = require('./helpers/db_cleaner')
const User = require('../src/models/User')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user

describe('User', function () {
  beforeAll(function () {
    return dbCleaner()
  })

  it('validates passwords correctly after saving to db', function () {
    var user = new User(userFixture)

    return user.save().then(function (user) {
      return User.findByUsername(user.username)
    }).then(function (user) {
      return Promise.all([user, user.validPassword(userFixture.password)])
    }).then(([user, isValid]) => {
      expect(isValid).toEqual(true)
      return Promise.all([user, user.validPassword('wrongpassword')])
    }).then(([user, isValid]) => {
      expect(isValid).toEqual(false)
    })
  })

  it('raises an error if trying to save a non-unique user', () => {
    var user = new User(userFixture)

    return user.save().catch(err => {
      expect(err.name).toEqual('ConflictError')
    })
  })
})
