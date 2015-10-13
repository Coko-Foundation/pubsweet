const request = require('supertest')
const expect = require('expect.js')
const app = require('../app')
const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')

const collectionFixture = {
  "type": "collection",
  "title": "Science Blogger posts",
}

const fragmentFixture = {
  "type": "blogpost",
  "source": "<blog></blog>",
  "presentation": "<p></p>"
}

var updatedFragmentFixture = {
  "source": "<blog><title>Updated</title></blog>",
  "presentation": "<p><h1>Updated</h1></p>"
}

describe('api', function(){
  var collectionId
  var fragmentId

  before(function() {
    return dbCleaner
  })

  it('creates a collection', function(done){
    request(app)
      .post('/api/collection')
      .send(collectionFixture)
      .expect(function(res) {
        console.log(res)
        expect(res.body.ok).to.eql(true)
        // Store collectionId for later tests
        collectionId = res.body.id
      })
      .expect(201, done);
  })

  it('gets the collection', function(done){
    request(app)
      .get('/api/collection')
      .expect('Content-Type', /json/)
      .expect(200, objectAssign({_id: collectionId}, collectionFixture))
      .end(done)
  })

  it('creates a fragment within the collection', function(done) {
    request(app)
      .post('/api/fragment')
      .send(fragmentFixture)
      .expect(function(res) {
        expect(res.body).to.eql(fragmentFixture)
        fragmentId = res.body.id
      })
      .expect(201, done)
  })

  it('gets all fragments', function(done){
    request(app)
      .get('/api/fragments')
      .expect(200, [
        Object.assign({id: fragmentId}, fragmentFixture)
      ])
      .end(done)
  })

  it('updates a fragment', function(done){
    request(app)
      .put('/api/fragments/'+fragmentId)
      .send(updatedFragmentFixture)
      .expect(200, Object.assign({id: id}, updatedFragmentFixture))
      .end(done)
  })

  it('deletes a fragment', function(done){
    request(app)
      .del('/api/fragments/'+fragmentId)
      .expect(200, done);
  })
})
