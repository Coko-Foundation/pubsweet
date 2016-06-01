const request = require('supertest-as-promised')
const expect = require('expect.js')

const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const otherUserFixture = fixtures.updatedUser
const collectionFixture = fixtures.collection
const fragmentFixture = fixtures.fragment
const updatedFragmentFixture = fixtures.updatedFragment

const User = require('../models/User')
const Fragment = require('../models/Fragment')
const Collection = require('../models/Collection')

var api = require('../api')

describe('admin api', function () {
  var otherUser
  var fragment

  before(function () {
    return dbCleaner().then(function () {
      const Setup = require('../setup-base')
      return Setup.setup(
        userFixture.username,
        userFixture.email,
        userFixture.password,
        collectionFixture.title)
    }).then(function () { // Create another user without any roles
      otherUser = new User({
        username: otherUserFixture.username,
        email: otherUserFixture.email,
        password: otherUserFixture.password
      })
      return otherUser.save()
    })
  })

  before(function () {
    fragment = new Fragment(fragmentFixture)
    fragment.owner = otherUser.id
    return Collection.find(1).then(function (collection) {
      return fragment.save().then(function (fragment) {
        collection.addFragment(fragment)
        return collection.save()
      })
    })
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
          .post('/api/collection/fragments')
          .send(fragmentFixture)
          .set('Authorization', 'Bearer ' + token)
          .expect(201)
      }).then(function (res) {
        expect(res.body.source).to.eql(fragmentFixture.source)
      })
  })

  it('reads all fragments', function () {
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
          .get('/api/collection/fragments')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      }).then(function (res) {
        expect(res.body.length).to.eql(2)
      })
  })

  it('updates a fragment owned by someone else', function () {
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
          .put('/api/collection/fragments/' + fragment.id)
          .send(updatedFragmentFixture)
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      })
  })
})
