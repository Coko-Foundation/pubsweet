const request = require('supertest')
const expect = require('expect.js')

const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')
const PouchDB = require('pouchdb')

const collectionFixture = {
  "type": "collection",
  "title": "Science Blogger posts",
}

const fragmentFixture = {
  "type": "blogpost",
  "source": "<blog></blog>",
  "presentation": "<p></p>"
}

var app
var updatedFragmentFixture = {
  "source": "<blog><title>Updated</title></blog>",
  "presentation": "<p><h1>Updated</h1></p>"
}

describe('api', function (){
  var collectionId
  var fragmentId

  before(function() {
    return dbCleaner.then(function () {
       // We load the app here to ensure that the database is cleaned before
       // creating a new one
       app = require('../app')
    })
  })

  it('creates a collection', function (done){
    request(app)
      .post('/api/collection')
      .send(collectionFixture)
      .expect(function(res) {
        expect(res.body.ok).to.eql(true)
        // Store collectionId for later tests
        collectionId = res.body.id
      })
      .expect(201, done);
  })

  it('returns existing collection if you try creating it again', function (done) {
    request(app)
      .post('/api/collection')
      .send(collectionFixture)
      .expect(function(res) {
        expect(res.body._id).to.eql(collectionId)
      })
      .expect(200, done);
  })

  it('gets the collection', function (done){
    request(app)
      .get('/api/collection')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(_.omit(res.body, '_rev'))
          .to.eql(objectAssign({_id: collectionId}, collectionFixture))
      })
      .expect(200, done)
  })

  it('creates a fragment within the collection', function (done) {
    request(app)
      .post('/api/collection/fragment')
      .send(fragmentFixture)
      .expect(function (res) {
        expect(res.body.ok).to.eql(true)
        fragmentId = res.body.id
      })
      .expect(201, done)
  })

  it('gets all fragments', function (done){
    request(app)
      .get('/api/collection/fragments')
      .expect(function(res) {
        expect(res.body.length).to.eql(1)
        expect(_.omit(res.body[0], '_rev'))
          .to.eql(objectAssign({_id: fragmentId}, fragmentFixture))
      })
      .expect(200, done)
  })

  it('updates a fragment', function (done){
    request(app)
      .put('/api/collection/fragment')
      .send(Object.assign({_id: fragmentId}, updatedFragmentFixture))
      .expect(function (res) {
        expect(res.body.ok).to.eql(true)
      })
      .end(done)
  })

  it('get a specific fragments', function (done){
    request(app)
      .get('/api/collection/fragment/' + fragmentId)
      .expect(function (res) {
        expect(_.omit(res.body, '_rev'))
          .to.eql(objectAssign({_id: fragmentId}, updatedFragmentFixture))
      })
      .expect(200, done)
  })


  it('deletes a fragment', function (done){
    request(app)
      .del('/api/collection/fragment')
      .send(objectAssign({_id: fragmentId}, fragmentFixture))
      .expect(200, done);
  })

  it('deletes the collection', function (done) {
    request(app)
      .del('/api/collection')
      .expect(200, done)
  })
})
