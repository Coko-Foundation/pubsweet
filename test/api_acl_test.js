const request = require('supertest-as-promised')
const expect = require('expect.js')

// const _ = require('lodash')
// const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const collectionFixture = fixtures.collection
const roleFixture = fixtures.role
const userRoleFixture = fixtures.userRole
const fragmentFixture = fixtures.fragment

var app

describe('api', function () {
  before(function () {
    return dbCleaner.then(function () {
       // We load the app here to ensure that the database is cleaned before
       // creating a new one
       app = require('../app')
    })
  })

  it('can assign an access control entity to a collection', function () {
    request(app)
      .post('/api/users') // Create a user
      .send(userFixture)
      .then(function (res) {
        console.log('Creating a collection')
        return request(app)
          .post('/api/collection') // Create a collection
          .send(collectionFixture)
      }).then(function (res) {
        console.log('Creating admin role')
        var collectionId = res.body.id
        return request(app)
          .post('/api/acl/roles') // Create an admin role for the collection
          .send(Object.assign(roleFixture, {resource: collectionId}))
          .expect(201)
      }).then(function (res) {
        console.log('Assigning user to role')
        return request(app)
          .post('/api/acl/ace') // Assign the user to the role
          .send(userRoleFixture)
      }).catch(function (err) {
        console.log(err)
      })
  })
})
