const request = require('supertest-as-promised')
const expect = require('expect.js')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const collectionFixture = fixtures.collection
const fragmentFixture = fixtures.fragment

const Fragment = require('../models/Fragment')
// const User = require('../models/User')
const Collection = require('../models/Collection')

var api = require('../api')

describe('unauthenticated/public api', function () {
  var fragment

  beforeEach(function () {
    return dbCleaner().then(function () {
      const Setup = require('../setup-base')
      return Setup.setup(
        userFixture.username,
        userFixture.email,
        userFixture.password,
        collectionFixture.title)
    })
  })

  describe('published fragment', function () {
    beforeEach(function () {
      fragment = new Fragment(fragmentFixture)
      fragment.published = true

      return fragment.save().then(function (fragment) {
        return Collection.get()
      }).then(function (collection) {
        collection.addFragment(fragment)
        return collection.save()
      })
    })

    afterEach(function () {
      return fragment.delete()
    })

    it('can read a fragment in a protected collection if it is published', function () {
      return request(api)
        .get('/api/collection/fragments')
        .expect(200)
        .then(function (res) {
          expect(res.body[0]._id).to.eql(fragment._id)
        })
    })
  })

  describe('unpublished fragment', function () {
    var fragment
    beforeEach(function () {
      fragment = new Fragment(fragmentFixture)
      return fragment.save().then(function (fragment) {
        return Collection.get()
      }).then(function (collection) {
        collection.addFragment(fragment)
        return collection.save()
      })
    })

    afterEach(function () {
      return fragment.delete()
    })

    it('can not list unpublished fragments in a protected collection', function () {
      return request(api)
        .get('/api/collection/fragments')
        .expect(200)
        .then(function (res) {
          expect(res.body).to.eql([])
        })
    })

    it('can not find a fragment in a protected collection', function () {
      return request(api)
        .get('/api/collection/fragments/' + fragment._id)
        .expect(404)
    })
  })
})
