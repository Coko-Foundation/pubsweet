const request = require('supertest-as-promised')
const expect = require('expect.js')

const _ = require('lodash')
const dbCleaner = require('./helpers/db_cleaner')

const User = require('../models/user')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const updatedUserFixture = fixtures.updatedUser
const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
var api = require('../api')

function clean (user) {
  return _.omit(user, ['_rev', 'password', 'passwordHash'])
}

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
    }).catch(function (err) {
      console.log(err)
      throw err
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
      return User.find(otherUser._id).then(function (user) {
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
          expect(res.body.users[0].username).to.eql(userFixture.username)
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
          var cleaned = clean(res.body)
          expect(cleaned.roles).to.eql([])
          expect(cleaned._id).to.eql(otherUserId)
          expect(cleaned.username).to.eql(otherUserFixture.username)
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
          expect(clean(res.body)).to.eql(Object.assign(
              {_id: otherUserId, type: 'user', roles: []},
              clean(updatedUserFixture))
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

  it('can not create a user if user exists', function () {
    return request(api)
      .post('/api/users')
      .send(userFixture)
      .expect(409)
  })
})
