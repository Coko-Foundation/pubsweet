const request = require('supertest-as-promised')
const expect = require('expect.js')

const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const updatedUserFixture = fixtures.updatedUser
const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
var api

describe('users api', function () {
  var userId
  var otherUser

  beforeEach(function () {
    return dbCleaner().then(function () {
      var Setup = require('../setup-base')
      return Setup.setup(
        userFixture.username,
        userFixture.email,
        userFixture.password,
        collectionFixture.title)
    }).then(function (user) {
      userId = user._id
      api = require('../api')
    }).catch(function (err) {
      console.log(err)
    })
  })

  // after(function () {
  //   return dbCleaner().then(function (response) {
  //     console.log('After test cleaning')
  //     return response
  //   })
  // })

  describe('admin', function () {
    it('can get a list of users', function () {
      request(api)
        .get('/api/users')
        .expect(200)
        .then(function (res) {
          expect(res.body.users.length).to.eql(1)
        })
    })
  })

  describe('unauthenticated user', function () {
    var otherUserId

    it('can sign up', function () {
      request(api)
        .post('/api/users')
        .send(otherUserFixture)
        .expect(201)
        .then(function (res) {
          // Store userId for later
          otherUserId = res.body._id
          expect(res.body.username).to.eql(otherUserFixture.username)
        })
    })

    it('can not get a list of users', function () {
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
            .get('/api/users')
            .set('Authorization', 'Bearer ' + token)
            .expect(401)
        })
    })

    it('can not delete other users', function () {
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
            .delete('/api/users/' + userId)
            .set('Authorization', 'Bearer ' + token)
            .expect(401)
        })
    })

    it('user can delete itself', function () {
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
            .delete('/api/users/' + otherUserId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
        })
    })
  })

  it('can not create a user if user exists', function (done) {
    request(api)
      .post('/api/users')
      .send(userFixture)
      .expect(409, done)
  })

  it('gets the user', function (done) {
    request(api)
      .get('/api/users/' + userId)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(_.omit(res.body, 'rev'))
          .to.eql(objectAssign({id: userId}, userFixture))
      })
      .expect(200, done)
  })

  it('updates a user', function (done) {
    request(api)
      .put('/api/users/' + userId)
      .send(Object.assign({_id: userId}, updatedUserFixture))
      .expect(function (res) {
        expect(res.body.ok).to.eql(true)
      })
      .end(done)
  })

  it('persists the updated user', function (done) {
    request(api)
      .get('/api/users/' + userId)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(_.omit(res.body, '_rev'))
          .to.eql(objectAssign(
            {_id: userId, type: 'user'}, updatedUserFixture)
          )
      })
      .expect(200, done)
  })

  it('authenticates a user', function (done) {
    request(api)
      .post('/api/users/authenticate')
      .send({
        username: updatedUserFixture.username,
        password: updatedUserFixture.password
      })
      .expect(201, done)
  })

  it('deletes a user', function (done) {
    request(api)
      .del('/api/users/' + userId)
      .send(objectAssign({_id: userId}, userFixture))
      .expect(200)
      .end(function () {
        request(api)
          .get('/api/users')
          .expect(function (res) {
            expect(res.body).to.eql([])
          })
          .expect(200, done)
      })
  })
})
