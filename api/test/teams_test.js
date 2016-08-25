const request = require('supertest-as-promised')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const Collection = require('../models/Collection')
const Fragment = require('../models/Fragment')

const User = require('../models/User')
const Team = require('../models/Team')

const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const userFixture = fixtures.user
const adminFixture = fixtures.adminUser
const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
const teamFixture = fixtures.team
const fragmentFixture = fixtures.fragment

const NotFoundError = require('../errors/NotFoundError')

describe('Teams model', function () {
  let adminId
  let userId
  let collectionId
  let fragmentId

  beforeEach(function () {
    return dbCleaner().then(function () {
      return new User(adminFixture).save()
    }).then(function (admin) {
      adminId = admin.id
      return new User(userFixture).save()
    }).then(function (user) {
      userId = user.id
      return new Collection(collectionFixture).save()
    }).then(function (collection) {
      collectionId = collection.id
      return new Fragment(fragmentFixture).save()
    }).then(function (fragment) {
      fragmentId = fragment.id
    })
  })

  it('can save a team without members', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.objectId = collectionId
    team.objectType = 'collection'
    team = new Team(team)

    return team.save().then(function (savedTeam) {
      expect(savedTeam.members).to.eql([])
      expect(savedTeam.objectId).to.eql(team.objectId)
      expect(savedTeam.teamType).to.eql(team.teamType)
      expect(savedTeam.name).to.eql(team.name)
    })
  })

  it('can save a team with members', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.objectId = collectionId
    team.objectType = 'collection'
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team.save().then(function (savedTeam) {
      teamId = savedTeam.id
      expect(savedTeam.members).to.eql([userId])
      expect(savedTeam.objectId).to.eql(team.objectId)
      expect(savedTeam.teamType).to.eql(team.teamType)
      expect(savedTeam.name).to.eql(team.name)
      return User.find(userId)
    }).then(function (user) {
      expect(user.teams).to.eql([teamId])
    })
  })

  it('can save a team with members based around a fragment', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.objectId = fragmentId
    team.objectType = 'fragment'
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team.save().then(function (savedTeam) {
      teamId = savedTeam.id
      expect(savedTeam.members).to.eql([userId])
      expect(savedTeam.objectId).to.eql(team.objectId)
      expect(savedTeam.objectType).to.eql(team.objectType)
      expect(savedTeam.teamType).to.eql(team.teamType)
      expect(savedTeam.name).to.eql(team.name)
      return User.find(userId)
    }).then(function (user) {
      expect(user.teams).to.eql([teamId])
    })
  })

  it('can update a team with members', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.objectId = collectionId
    team.objectType = 'collection'
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team.save().then(function (savedTeam) {
      return Team.find(savedTeam.id)
    }).then(function (team) {
      return team.updateProperties({
        members: [userId, adminId]
      })
    }).then(function (team) {
      return team.save()
    }).then(function (savedTeam) {
      teamId = savedTeam.id
      expect(savedTeam.members).to.eql([userId, adminId])
      expect(savedTeam.objectId).to.eql(team.objectId)
      expect(savedTeam.teamType).to.eql(team.teamType)
      expect(savedTeam.name).to.eql(team.name)
      return User.find(userId)
    }).then(function (user) {
      expect(user.teams).to.eql([teamId])
      return User.find(adminId)
    }).then(function (admin) {
      expect(admin.teams).to.eql([teamId])
    })
  })

  it('can delete a team with members', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.objectId = collectionId
    team.objectType = 'collection'
    team.members = [userId]
    team = new Team(team)

    return team.save().then(function (savedTeam) {
      return Team.find(savedTeam.id)
    }).then(function (team) {
      return team.delete()
    }).then(function (deletedTeam) {
      expect(Team.find(deletedTeam.id)).to.be.rejectedWith(NotFoundError)
      return User.find(userId)
    }).then(function (user) {
      expect(user.teams).to.eql([])
    })
  })
})
