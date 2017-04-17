const STATUS = require('http-status-codes')

const createBasicCollection = require('./helpers/basic_collection')
const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const User = require('../src/models/User')
const Fragment = require('../src/models/Fragment')

var api = require('./helpers/api')

describe('admin api', () => {
  var otherUser
  var collection
  var fragment

  beforeEach(() => {
    // Create collection with admin user and one non-admin user
    return cleanDB().then(
      createBasicCollection
    ).then(
      (userAndCol) => {
        collection = userAndCol.collection
      }
    ).then(
      () => {
        // Create another user without any roles
        otherUser = new User(fixtures.updatedUser)
        return otherUser.save()
      }
    ).then(
      () => {
        // Create fragment and add fragment to collection
        fragment = new Fragment(fixtures.fragment)
        fragment.setOwners([otherUser.id])
        return fragment.save().then(
          fragment => {
            collection.addFragment(fragment)
            return collection.save()
          }
        )
      }
    )
  })

  afterEach(cleanDB)

  it('creates a fragment in the protected collection if authenticated', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => api.fragments.post(fixtures.fragment, collection, token)
    ).then(
      res => expect(res.body.source).toEqual(fixtures.fragment.source)
    )
  })

  it('reads all fragments', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => api.fragments.get(collection, token)
    ).then(
      res => expect(res.body.length).toEqual(1)
    )
  })

  it('updates a fragment owned by someone else', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => api.fragments.patch(
        fragment.id, fixtures.fragment, collection, token
      ).expect(STATUS.OK)
    )
  })
})
