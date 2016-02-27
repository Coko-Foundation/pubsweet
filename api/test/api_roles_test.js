const request = require('supertest-as-promised')
const expect = require('expect.js')
const User = require('../models/user')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
const roleFixture = fixtures.role
const userRoleFixture = fixtures.userRole

var api = require('../api')

describe('roles', function () {
  var userId
  var otherUser

  before(function () {
    return dbCleaner().then(function () {
      var Setup = require('../setup-base')
      return Setup.setup(
        userFixture.username,
        userFixture.email,
        userFixture.password,
        collectionFixture.title)
    }).then(function (user) {
      userId = user._id

      otherUser = new User({
        username: otherUserFixture.username,
        email: otherUserFixture.email,
        password: otherUserFixture.password
      })
      return otherUser.save()
    }).catch(function (err) {
      console.log(err)
      throw err
    })
  })

  it("can get user's roles", function () {
    return request(api)
      .post('/api/users/authenticate')
      .send({
        username: userFixture.username,
        password: userFixture.password
      })
      .expect(201)
      .then(function (res) {
        var token = res.body.token
        return request(api)
          .get('/api/users/' + userId + '/roles')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      })
  })

  it('admin can assign a role to the user', function () {
    // return request(api)
    //   .post('/api/users/authenticate')
    //   .send({
    //     username: userFixture.username,
    //     password: userFixture.password
    //   })
    //   .expect(201)
    //   .then(function (res) {

    //   })
    //   .post('/api/acl')
    //   .send(userFixture)
    //   .then(function (res) {
    //     console.log('Creating a collection')
    //     return request(api)
    //       .post('/api/collection') // Create a collection
    //       .send(collectionFixture)
    //   }).then(function (res) {
    //     console.log('Creating admin role')
    //     var collectionId = res.body.id
    //     return request(api)
    //       .post('/api/acl/roles') // Create an admin role for the collection
    //       .send(Object.assign(roleFixture, {resource: collectionId}))
    //       .expect(201)
    //   }).then(function (res) {
    //     console.log('Assigning user to role')
    //     return request(api)
    //       .post('/api/acl/ace') // Assign the user to the role
    //       .send(userRoleFixture)
    //   }).catch(function (err) {
    //     console.log(err)
    //   })
  })
})
