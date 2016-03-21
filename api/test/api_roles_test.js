const request = require('supertest-as-promised')
const expect = require('expect.js')
const User = require('../models/User')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
const roleFixture = fixtures.role
const userRoleFixture = fixtures.userRole

var api = require('../api')

describe('roles', function () {
  var admin
  var contributor
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
      admin = user
      otherUser = new User({
        username: otherUserFixture.username,
        email: otherUserFixture.email,
        password: otherUserFixture.password
      })
      return otherUser.save()
    }).then(function (user) {
      contributor = user
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
          .get('/api/users/' + admin._id + '/roles')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      }).then(function (res) {
        expect(res.body).to.eql(['admin'])
      })
  })

  it('admin can assign a role to the user', function () {
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
          .put('/api/users/' + contributor._id + '/roles')
          .send(['contributor'])
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      }).then(function (res) {
        expect(res.body).to.eql(['contributor'])
      })
  })

  it('contributor can not assign a role to admin', function () {
    return request(api)
      .post('/api/users/authenticate')
      .send({
        username: otherUserFixture.username,
        password: otherUserFixture.password
      })
      .expect(201)
      .then(function (res) {
        var token = res.body.token
        return request(api)
          .put('/api/users/' + admin._id + '/roles')
          .send(['admin', 'contributor'])
          .set('Authorization', 'Bearer ' + token)
          .expect(403)
      })
  })

  it('admin can assign a role to the user via updating the user directly', function () {
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
          .put('/api/users/' + otherUser._id)
          .send({roles: ['contributor', 'reader']})
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      }).then(function (res) {
        console.log(res.body)
        expect(res.body.roles).to.have.length(2)
        expect(res.body.roles).to.contain('contributor')
        expect(res.body.roles).to.contain('reader')
      })
  })
})
