const request = require('supertest-as-promised')
const expect = require('expect.js')

const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')

const User = require('../models/user')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const updatedUserFixture = fixtures.updatedUser
const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
var api

describe('users api', function () {
  var userId
  var otherUserId

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
      api = require('../api')
    }).catch(function (err) {
      console.log(err)
    })
  })

  describe('admin', function () {
    var otherUser

    before(function () {
      otherUser = new User(otherUserFixture)
      return otherUser.save().then(function (user) {
        otherUser = user
      })
    })

    after(function () {
      return User.findById(otherUser._id).then(function (user) {
        return user.delete()
      }).catch(function (err) {
        console.log(err)
      })
    })

    it('can get a list of users', function () {
      return request(api)
        .post('/api/users/authenticate')
        .send({
          username: userFixture.username,
          password: userFixture.password
        }).expect(201)
        .then(function (res) {
          var token = res.body.token
          return request(api)
            .get('/api/users')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
        }).then(function (res) {
          expect(res.body.users.length).to.eql(2)
        })
    })

    it('deletes a user', function () {
      return request(api)
        .post('/api/users/authenticate')
        .send({
          username: userFixture.username,
          password: userFixture.password
        }).expect(201)
        .then(function (res) {
          var token = res.body.token
          return request(api)
            .del('/api/users/' + otherUser._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
        })
    })
  })

  describe('unauthenticated user', function () {
    it('can not get a list of users', function () {
      return request(api)
        .get('/api/users')
        .expect(401)
    })

    it('can sign up', function () {
      return request(api)
        .post('/api/users')
        .send(otherUserFixture)
        .expect(201)
        .then(function (res) {
          // Store userId for later
          otherUserId = res.body._id
          expect(res.body.username).to.eql(otherUserFixture.username)
        })
    })
  })

  describe('new user', function () {
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
            .expect(403)
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
            .expect(403)
        })
    })

    it('can not get other users', function () {
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
            .get('/api/users/' + userId)
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(403)
        })
    })

    it('can get itself', function () {
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
            .get('/api/users/' + otherUserId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
        }).then(function (res) {
          expect(_.omit(res.body, '_rev'))
            .to.eql(Object.assign({_id: otherUserId}, otherUserFixture))
        })
    })

    it('updates itself', function () {
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
            .put('/api/users/' + otherUserId)
            .set('Authorization', 'Bearer ' + token)
            .send(Object.assign({_id: otherUserId}, updatedUserFixture))
            .expect(200)
        })
    })

    it('authenticates a user', function () {
      return request(api)
        .post('/api/users/authenticate')
        .send({
          username: updatedUserFixture.username,
          password: updatedUserFixture.password
        })
        .expect(201)
    })

    it('persists the updated user', function () {
      return request(api)
        .post('/api/users/authenticate')
        .send({
          username: updatedUserFixture.username,
          password: updatedUserFixture.password
        })
        .expect(201)
        .then(function (res) {
          var token = res.body.token
          return request(api)
            .get('/api/users/' + otherUserId)
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .expect(200)
        }).then(function (res) {
          expect(_.omit(res.body, '_rev')).to.eql(Object.assign(
              {_id: otherUserId, type: 'user'}, updatedUserFixture)
            )
        })
    })

    it('user can delete itself', function () {
      return request(api)
        .post('/api/users/authenticate')
        .send({
          username: updatedUserFixture.username,
          password: updatedUserFixture.password
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
})
