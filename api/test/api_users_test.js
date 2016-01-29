const request = require('supertest')
const expect = require('expect.js')

const _ = require('lodash')
const objectAssign = require('object-assign')
const dbCleaner = require('./helpers/db_cleaner')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user
const updatedUserFixture = fixtures.updatedUser

var api

describe('api', function () {
  var userId

  before(function () {
    return dbCleaner.then(function () {
       // We load the api here to ensure that the database is cleaned before
       // creating a new one
       api = require('../api')
    })
  })

  it('creates a user', function (done) {
    request(api)
      .post('/api/users')
      .send(userFixture)
      .expect(function (res) {
        // Store userId for later
        userId = res.body._id
        console.log('User id', userId)
        console.log('Response body', res.body)
        expect(res.body.ok).to.eql(true)
      })
      .expect(201, done)
  })

  it('can not create a user if no permissions and user exists', function (done) {
    request(api)
      .post('/api/users')
      .send(userFixture)
      .expect(401, done)
  })

  it('gets the user', function (done) {
    request(api)
      .get('/api/users/' + userId)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(_.omit(res.body, 'rev'))
          .to.eql(objectAssign({id: userId}, userFixture))
      })
      .expect(200, done)
  })

  it('updates a user', function (done) {
    request(api)
      .put('/api/users/' + userId)
      .send(Object.assign({_id: userId}, updatedUserFixture))
      .expect(function (res) {
        expect(res.body.ok).to.eql(true)
      })
      .end(done)
  })

  it('persists the updated user', function (done) {
    request(api)
      .get('/api/users/' + userId)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(_.omit(res.body, '_rev'))
          .to.eql(objectAssign(
            {_id: userId, type: 'user'}, updatedUserFixture)
          )
      })
      .expect(200, done)
  })

  it('logs a user in', function (done) {
    request(api)
      .post('/api/users/session')
      .send({
        username: updatedUserFixture.username,
        password: updatedUserFixture.password
      })
      .expect(201, done)
  })

  it('deletes a user', function (done) {
    request(api)
      .del('/api/users/' + userId)
      .send(objectAssign({_id: userId}, userFixture))
      .expect(200)
      .end(function () {
        request(api)
          .get('/api/users')
          .expect(function (res) {
            expect(res.body).to.eql([])
          })
          .expect(200, done)
      })
  })
})
