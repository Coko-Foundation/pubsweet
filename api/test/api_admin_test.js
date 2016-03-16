const request = require('supertest-as-promised')
const expect = require('expect.js')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const otherUserFixture = fixtures.updatedUser
const collectionFixture = fixtures.collection
const fragmentFixture = fixtures.fragment
const updatedFragmentFixture = fixtures.updatedFragment

const Fragment = require('../models/Fragment')
const User = require('../models/user')
var api = require('../api')

describe('admin api', function () {
  var otherUser
  var fragment

  beforeEach(function () {
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

  beforeEach(function () {
    const Fragment = require('../models/Fragment')
    fragment = new Fragment(fragmentFixture)
    fragment.owner = otherUserFixture.username
    return fragment.save()
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
          .put('/api/collection/fragments/' + fragment._id)
          .send(updatedFragmentFixture)
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      })
  })
})
