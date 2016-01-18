const request = require('supertest')
const expect = require('expect.js')

const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')

const userFixture = {
  'type': 'user',
  'name': 'test user',
  'email': 'test@example.com',
  'password': 'test'
}

var updatedUserFixture = {
  'name': 'changed user'
}

var app

describe('api', function () {
  var userId

  before(function () {
    return dbCleaner.then(function () {
       // We load the app here to ensure that the database is cleaned before
       // creating a new one
       app = require('../app')
    })
  })

  it('creates a user', function (done) {
    request(app)
      .post('/api/users')
      .send(userFixture)
      .expect(function (res) {
        console.log(res.body)
        expect(res.body.ok).to.eql(true)
        // Store userId for later
        userId = res.body.id
      })
      .expect(201, done)
  })

  it('can not create a user if no permissions and user exists', function (done) {
    request(app)
      .post('/api/users')
      .send(userFixture)
      .expect(401, done)
  })

  it('gets the user', function (done) {
    request(app)
      .get('/api/users/' + userId)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(_.omit(res.body, '_rev'))
          .to.eql(objectAssign({_id: userId}, userFixture))
      })
      .expect(200, done)
  })

  it('updates a user', function (done) {
    request(app)
      .put('/api/users/' + userId)
      .send(Object.assign({_id: userId}, updatedUserFixture))
      .expect(function (res) {
        expect(res.body.ok).to.eql(true)
      })
      .end(done)
  })

  it('deletes a user', function (done) {
    request(app)
      .del('/api/users' + userId)
      .send(objectAssign({_id: userId}, userFixture))
      .expect(200)
      .end(function () {
        request(app)
          .get('/api/users')
          .expect(function (res) {
            expect(res.body.users).to.eql([])
          })
          .expect(200, done)
      })
  })
})
