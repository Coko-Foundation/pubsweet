const request = require('supertest-as-promised')
const expect = require('expect.js')

const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const collectionFixture = fixtures.collection
const fragmentFixture = fixtures.fragment
const updatedFragmentFixture = fixtures.updatedFragment

var api

describe('authenticated api', function () {
  var fragmentId

  before(function () {
    return dbCleaner.then(function () {
      const Setup = require('../setup-base')
      return Setup.setup(
        userFixture.username,
        userFixture.email,
        userFixture.password,
        collectionFixture.title)
    }).then(function () {
      api = require('../api')
    })
  })

  it('creates a fragment in the protected collection if authenticated', function () {
    request(api)
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
})
