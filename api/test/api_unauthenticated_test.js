const request = require('supertest')
const expect = require('expect.js')

const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')

const fixtures = require('./fixtures/fixtures')
const collectionFixture = fixtures.collection
const fragmentFixture = fixtures.fragment
const updatedFragmentFixture = fixtures.updatedFragment

var api

describe('unauthenticated api without roles or users', function () {
  var collectionId
  var fragmentId

  before(function () {
    return dbCleaner.then(function () {
      // We load the api here to ensure that the database is cleaned before
      // creating a new one
      api = require('../api')
    })
  })

  after(function () {
    return dbCleaner
  })

  it('creates a collection', function (done) {
    request(api)
      .post('/api/collection')
      .send(collectionFixture)
      .expect(function (res) {
        // Store collectionId for later tests
        collectionId = res.body._id
      })
      .expect(201, done)
  })

  it('returns existing collection if you try creating it again', function (done) {
    request(api)
      .post('/api/collection')
      .send(collectionFixture)
      .expect(function (res) {
        expect(res.body._id).to.eql(collectionId)
      })
      .expect(200, done)
  })

  it('gets the collection', function (done) {
    request(api)
      .get('/api/collection')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(_.omit(res.body, '_rev'))
          .to.eql(objectAssign({_id: collectionId}, collectionFixture))
      })
      .expect(200, done)
  })

  it('creates a fragment within the collection', function (done) {
    request(api)
      .post('/api/collection/fragment')
      .send(fragmentFixture)
      .expect(function (res) {
        expect(res.body.source).to.eql(fragmentFixture.source)
        fragmentId = res.body._id
      })
      .expect(201, done)
  })

  it('gets all fragments', function (done) {
    request(api)
      .get('/api/collection/fragments')
      .expect(function (res) {
        expect(res.body.length).to.eql(1)
        expect(_.omit(res.body[0], '_rev', 'type'))
          .to.eql(objectAssign({_id: fragmentId}, fragmentFixture))
      })
      .expect(200, done)
  })

  it('updates a fragment', function (done) {
    request(api)
      .put('/api/collection/fragment')
      .send(Object.assign({_id: fragmentId}, updatedFragmentFixture))
      .expect(function (res) {
        expect(res.body.source).to.eql(updatedFragmentFixture.source)
      })
      .expect(200, done)
  })

  it('get a specific fragments', function (done) {
    request(api)
      .get('/api/collection/fragment/' + fragmentId)
      .expect(function (res) {
        expect(_.omit(res.body, '_rev', 'type'))
          .to.eql(objectAssign({_id: fragmentId}, updatedFragmentFixture))
      })
      .expect(200, done)
  })

  it('deletes a fragment', function (done) {
    request(api)
      .del('/api/collection/fragment')
      .send(objectAssign({_id: fragmentId}, fragmentFixture))
      .expect(200)
      .end(function () {
        request(api)
          .get('/api/collection')
          .expect(function (res) {
            expect(res.body.fragments).to.eql([])
          })
          .expect(200, done)
      })
  })

  it('deletes the collection', function (done) {
    request(api)
      .del('/api/collection')
      .expect(200, done)
  })
})
