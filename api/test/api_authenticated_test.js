const request = require('supertest-as-promised')
const expect = require('expect.js')
const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const otherUserFixture = fixtures.updatedUser
const collectionFixture = fixtures.collection
const fragmentFixture = fixtures.fragment
const updatedFragmentFixture = fixtures.updatedFragment

var api

describe('authenticated api', function () {
  var otherUser
  var fragmentId

  beforeEach(function () {
    return dbCleaner().then(function () {
      const Setup = require('../setup-base')
      return Setup.setup(
        userFixture.username,
        userFixture.email,
        userFixture.password,
        collectionFixture.title)
    }).then(function () { // Create another user without any roles
      const User = require('../models/user')
      otherUser = new User({
        username: otherUserFixture.username,
        email: otherUserFixture.email,
        password: otherUserFixture.password
      })
      return otherUser.save()
    }).then(function () {
      api = require('../api')
    })
  })

  after(function () {
    return dbCleaner
  })

  it('creates a fragment in the protected collection if authenticated', function () {
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
          .post('/api/collection/fragment')
          .send(fragmentFixture)
          .set('Authorization', 'Bearer ' + token)
          .expect(201)
      }).then(function (res) {
        fragmentId = res.body._id
      })
  })

  it('fails to create a fragment in a protected collection if authenticated as user without permissions', function () {
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
          .post('/api/collection/fragment')
          .send(fragmentFixture)
          .set('Authorization', 'Bearer ' + token)
          .expect(401)
      })
  })

  describe('a non-admin user with a contributor role', function () {
    var otherFragmentId

    beforeEach(function () {
      return otherUser.addRole('contributor')
    })

    afterEach(function () {
      return otherUser.removeRole('contributor')
    })

    it('creates a fragment in a protected collection', function () {
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
            .post('/api/collection/fragment')
            .send(fragmentFixture)
            .set('Authorization', 'Bearer ' + token)
            .expect(201)
        }).then(function (res) {
          otherFragmentId = res.body._id
        })
    })

    describe('actions on a fragment owned by the same user', function () {
      var fragment

      beforeEach(function () {
        const Fragment = require('../models/fragment')
        fragment = new Fragment(fragmentFixture)
        fragment.owner = otherUserFixture.username
        return fragment.save()
      })

      afterEach(function () {
        return fragment.delete()
      })

      it('updates a fragment in a protected collection if an owner', function () {
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
              .put('/api/collection/fragment/' + fragment._id)
              .send(updatedFragmentFixture)
              .set('Authorization', 'Bearer ' + token)
              .expect(200)
          })
      })

    })

    describe('actions on a fragment owned by a different user', function () {
      var fragment

      beforeEach(function () {
        const Fragment = require('../models/fragment')
        fragment = new Fragment(fragmentFixture)
        fragment.owner = userFixture.username
        return fragment.save()
      })

      afterEach(function () {
        return fragment.delete()
      })

      it('cannot update a fragment in a protected collection if not an owner', function () {
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
              .put('/api/collection/fragment/' + fragment._id)
              .send(updatedFragmentFixture)
              .set('Authorization', 'Bearer ' + token)
              .expect(401)
          })
      })
    })
  })

  describe('a non-admin user with a reader role', function () {
    before(function () {
      return otherUser.addRole('reader')
    })

    it('can not create a fragment', function () {
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
            .post('/api/collection/fragment')
            .send(fragmentFixture)
            .set('Authorization', 'Bearer ' + token)
            .expect(401)
        })
    })

    it('can read a fragment', function () {
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
            .get('/api/collection/fragment/' + fragmentId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
        })
    })

    after(function () {
      return otherUser.removeRole('reader')
    })
  })

  it('fails to create a fragment in the protected collection if not authenticated', function () {
    return request(api)
      .post('/api/collection/fragment')
      .send(fragmentFixture)
      .expect(401)
  })

  it('fails to create a fragment in the protected collection if authentication wrong', function () {
    return request(api)
      .post('/api/collection/fragment')
      .send(fragmentFixture)
      .set('Authorization', 'Bearer ' + 'wrong')
      .expect(401)
  })
})
