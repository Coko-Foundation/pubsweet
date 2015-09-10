var request = require('supertest')
var expect = require('expect.js')
var app = require('../app')

var fixture = {
  "title": "Test",
  "status": "unpublished"
};

var updatedFixture = {
  title: "Updated test",
  status: "published",
}

describe('api for manage objects', function(){
  var id;
  require('./helpers/database_cleaner')

  it('creates a manage object', function(done){
    request(app)
      .post('/manages')
      .send({ data: fixture
      })
      .expect(function(res) {
        expect(res.body.data).to.eql(fixture);
        // For further tests
        id = res.body.id;
      })
      .expect(201, done);
  })

  it('gets a manage object', function(done){
    request(app)
      .get('/manages/'+id)
      .expect('Content-Type', /json/)
      .expect(200, {
        id: id,
        data: fixture
      })
      .end(done);
  })

  it('gets all manage objects', function(done){
    request(app)
      .get('/manages')
      .expect(200, [
        {id: id, data: fixture}
      ])
      .end(done)
  })

  it('updates a manage object', function(done){
    request(app)
      .put('/manages/'+id)
      .send({data: updatedFixture})
      .expect(200, {
        id: id,
        data: updatedFixture
      })
      .end(done);
  })

  it('deletes a manage object', function(done){
    request(app)
      .del('/manages/'+id)
      .expect(200, done);
  })
})
