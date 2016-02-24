const request = require('supertest-as-promised')
const expect = require('expect.js')

const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const collectionFixture = fixtures.collection
const roleFixture = fixtures.role
const userRoleFixture = fixtures.userRole
const fragmentFixture = fixtures.fragment

var api = require('../api')

describe('api', function () {
  before(function () {
    return dbCleaner()
  })

  after(function () {
    return dbCleaner
  })

  it('can assign an access control entity to a collection', function () {
    request(api)
      .post('/api/users') // Create a user
      .send(userFixture)
      .then(function (res) {
        console.log('Creating a collection')
        return request(api)
          .post('/api/collection') // Create a collection
          .send(collectionFixture)
      }).then(function (res) {
        console.log('Creating admin role')
        var collectionId = res.body.id
        return request(api)
          .post('/api/acl/roles') // Create an admin role for the collection
          .send(Object.assign(roleFixture, {resource: collectionId}))
          .expect(201)
      }).then(function (res) {
        console.log('Assigning user to role')
        return request(api)
          .post('/api/acl/ace') // Assign the user to the role
          .send(userRoleFixture)
      }).catch(function (err) {
        console.log(err)
      })
  })
})
