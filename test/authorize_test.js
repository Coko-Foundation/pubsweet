const cleanDB = require('./helpers/db_cleaner')
const User = require('../src/models/User')
const Authorize = require('../src/models/Authorize')
const AuthorizationError = require('../src/errors/AuthorizationError')

const fixtures = require('./fixtures/fixtures')
const createBasicCollection = require('./helpers/basic_collection')

const adminFixture = fixtures.adminUser
const userFixture = fixtures.user

describe('Authorize', () => {
  var collection

  beforeEach(() => {
    return cleanDB().then(
      createBasicCollection
    ).then(
      userAndCol => { collection = userAndCol.collection }
    )
  })

  describe('admin user', () => {
    it('can create fragments', () => {
      var user = new User(adminFixture)
      return user.save().then(
        user => {
          const url = `/api/collections/${collection.id}/fragments`
          return Authorize.can(user.id, 'create', url)
        }
      ).then(
        permission => expect(permission).toEqual(true)
      )
    })
  })

  describe('user without a team', () => {
    it('can not create a fragment', () => {
      var user = new User(userFixture)
      return user.save().then(
        user => {
          const url = `/api/collections/${collection.id}/fragments`

          return Authorize.can(user.id, 'create', url)
        }
      ).catch(err => {
        expect(err.name).toEqual('AuthorizationError')
        if(err.name !== 'AuthorizationError') {
          throw err
        }
      })
    })
  })
})
