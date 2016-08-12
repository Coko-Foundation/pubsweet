const request = require('supertest-as-promised')
const expect = require('expect.js')

const Collection = require('../models/Collection')
const User = require('../models/User')
const Team = require('../models/Team')

const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const userFixture = fixtures.user
const adminFixture = fixtures.adminUser
// const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
const teamFixture = fixtures.team

var api = require('../api')

describe('Teams API - admin', function () {
  before(function () {
    return dbCleaner().then(function () {
      return new User(adminFixture).save()
    }).then(function () {
      return new User(userFixture).save()
    })
  })

  it('should display an initially empty list of teams if user is admin', function () {
    return request(api)
      .post('/api/users/authenticate')
      .send({
        username: adminFixture.username,
        password: adminFixture.password
      })
      .expect(201)
      .then(function (res) {
        var token = res.body.token
        return request(api)
          .get('/api/teams')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      }).then(function (res) {
        expect(res.body).to.eql([])
      })
  })

  it('should display the existing teams if user is admin', function () {
    return new Team(teamFixture).save().then(function () {
      return request(api)
        .post('/api/users/authenticate')
        .send({
          username: adminFixture.username,
          password: adminFixture.password
        })
        .expect(201)
    }).then(function (res) {
      var token = res.body.token
      return request(api)
        .get('/api/teams')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
    }).then(function (res) {
      let team = res.body[0]
      expect(team.teamType.name).to.eql(teamFixture.teamType.name)
      expect(team.users).to.eql([])
    })
  })

  it('should not allow listing all teams if user is not an admin', function () {
    return request(api)
      .post('/api/users/authenticate')
      .send({
        username: userFixture.username,
        password: userFixture.password
      })
      .expect(201)
      .then(function (res) {
        var token = res.body.token
        return request(api)
          .get('/api/teams')
          .set('Authorization', 'Bearer ' + token)
          .expect(403)
      })
  })
})

describe.only('Teams API - per collection or fragment', function () {
  describe('Collection teams', function () {
    describe('owners', function () {
      let collectionId
      before(function () {
        return dbCleaner().then(function () {
          return new User(userFixture).save()
        }).then(function (user) {
          let collection = new Collection(collectionFixture)
          collection.owners = [user]
          return collection.save()
        }).then(function (collection) {
          collectionId = collection.id
        })
      })

      it('should display an initially empty list of teams if user is owner', function () {
        return request(api)
          .post('/api/users/authenticate')
          .send({
            username: userFixture.username,
            password: userFixture.password
          })
          .expect(201)
          .then(function (res) {
            var token = res.body.token
            return request(api)
              .get('/api/collections/' + collectionId + '/teams')
              .set('Authorization', 'Bearer ' + token)
              .expect(200)
          }).then(function (res) {
            expect(res.body).to.eql([])
          })
      })
    })

    describe('non-owners', function () {
      let collectionId
      before(function () {
        return dbCleaner().then(function () {
          return new User(userFixture).save()
        }).then(function (user) {
          let collection = new Collection(collectionFixture)
          collection.owners = []
          return collection.save()
        }).then(function (collection) {
          collectionId = collection.id
        })
      })

      it('should fail if user is not owner of collection or admin', function () {
        return request(api)
          .post('/api/users/authenticate')
          .send({
            username: userFixture.username,
            password: userFixture.password
          })
          .expect(201)
          .then(function (res) {
            var token = res.body.token
            return request(api)
              .get('/api/collections/' + collectionId + '/teams')
              .set('Authorization', 'Bearer ' + token)
              .expect(403)
          })
      })
    })
  })
})
