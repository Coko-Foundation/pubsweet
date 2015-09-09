var request = require('supertest')
var expect = require('expect.js')
var app = require('../app')

describe('api for manage objects', function(){

  it('post a manage object', function(done){
    request(app)
      .post('/manages')
      .send({ data: {
          "title": "Test",
          "status": "unpublished"
        }
      })
      .expect(200, {
        "id": 1,
        "data": {
          "title": "Test",
          "status": "unpublished"
        }
      })
      .expect(200, done)
  })

  // it('retrieves an object', function(done){
  //   superagent.get('http://localhost:3000/collections/test/'+id)
  //     .end(function(e, res){
  //       // console.log(res.body)
  //       expect(e).to.eql(null)
  //       expect(typeof res.body).to.eql('object')
  //       expect(res.body._id.length).to.eql(24)
  //       expect(res.body._id).to.eql(id)
  //       done()
  //     })
  // })

  // it('retrieves a collection', function(done){
  //   superagent.get('http://localhost:3000/collections/test')
  //     .end(function(e, res){
  //       // console.log(res.body)
  //       expect(e).to.eql(null)
  //       expect(res.body.length).to.be.above(0)
  //       expect(res.body.map(function (item){return item._id})).to.contain(id)
  //       done()
  //     })
  // })

  // it('updates an object', function(done){
  //   superagent.put('http://localhost:3000/collections/test/'+id)
  //     .send({name: 'Peter'
  //       , email: 'peter@yahoo.com'})
  //     .end(function(e, res){
  //       // console.log(res.body)
  //       expect(e).to.eql(null)
  //       expect(typeof res.body).to.eql('object')
  //       expect(res.body.msg).to.eql('success')
  //       done()
  //     })
  // })
  // it('checks an updated object', function(done){
  //   superagent.get('http://localhost:3000/collections/test/'+id)
  //     .end(function(e, res){
  //       // console.log(res.body)
  //       expect(e).to.eql(null)
  //       expect(typeof res.body).to.eql('object')
  //       expect(res.body._id.length).to.eql(24)
  //       expect(res.body._id).to.eql(id)
  //       expect(res.body.name).to.eql('Peter')
  //       done()
  //     })
  // })

  // it('removes an object', function(done){
  //   superagent.del('http://localhost:3000/collections/test/'+id)
  //     .end(function(e, res){
  //       // console.log(res.body)
  //       expect(e).to.eql(null)
  //       expect(typeof res.body).to.eql('object')
  //       expect(res.body.msg).to.eql('success')
  //       done()
  //     })
  // })
})
