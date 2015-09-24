var request = require('supertest')
var expect = require('expect.js')
var app = require('../app')

var fixture = {
  "content": "<p>Test</p>"
};

var updatedFixture = {
  content: "<p>Updated test</p>"
}

describe('api for create objects', function(){
  var id;
  require('./helpers/database_cleaner')

  it('creates a create object', function(done){
    request(app)
      .post('/manages/1/creates')
      .send({ data: fixture })
      .expect(function(res) {
        expect(res.body.data).to.eql(fixture);
        // For further tests
        id = res.body.id;
      })
      .expect(201, done);
  })

  it('gets a create object', function(done){
    request(app)
      .get('/manages/1/creates/'+id)
      .expect('Content-Type', /json/)
      .expect(200, {
        id: id,
        manage_id: 1,
        data: fixture
      })
      .end(done);
  })

  it('gets all create objects', function(done){
    request(app)
      .get('/manages/1/creates')
      .expect(200, [
        {id: id, manage_id: 1, data: fixture}
      ])
      .end(done)
  })

  it('updates a create object', function(done){
    request(app)
      .put('/manages/1/creates/'+id)
      .send({data: updatedFixture})
      .expect(200, {
        id: id,
        manage_id: 1,
        data: updatedFixture
      })
      .end(done);
  })

  it('deletes a create object', function(done){
    request(app)
      .del('/manages/1/creates/'+id)
      .expect(200, done);
  })
})
