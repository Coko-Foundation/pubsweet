const STATUS = require('http-status-codes')
const expect = require('expect.js')

const createBasicCollection = require('./helpers/basic_collection')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const User = require('../models/User')
const Fragment = require('../models/Fragment')

var api = require('./helpers/api')

describe('admin api', () => {
  var otherUser
  var collection
  var fragment

  beforeEach(() => {
    // Create collection with admin user and one non-admin user
    return dbCleaner().then(
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
        fragment.owners = [otherUser.id]
        return fragment.save().then(
          fragment => {
            collection.addFragment(fragment)
            return collection.save()
          }
        )
      }
    )
  })

  afterEach(dbCleaner)

  it('creates a fragment in the protected collection if authenticated', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => api.fragments.post(fixtures.fragment, collection, token)
    ).then(
      res => expect(res.body.source).to.eql(fixtures.fragment.source)
    )
  })

  it('reads all fragments', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => api.fragments.get(collection, token)
    ).then(
      res => expect(res.body.length).to.eql(1)
    )
  })

  it('updates a fragment owned by someone else', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => {
        api.fragments.post(
          fragment.id, fixtures.fragment, collection, token
        ).expect(STATUS.OK)
      }
    )
  })
})
