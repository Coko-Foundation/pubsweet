const request = require('supertest')

const Collection = require('../src/models/Collection')
const Fragment = require('../src/models/Fragment')
const User = require('../src/models/User')
const Team = require('../src/models/Team')

const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const userFixture = fixtures.user
const adminFixture = fixtures.adminUser
const otherUserFixture = fixtures.otherUser
const collectionFixture = fixtures.collection
const teamFixture = fixtures.contributorTeam
const fragmentFixture = fixtures.fragment

const NotFoundError = require('../src/errors/NotFoundError')

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
    team.object = {
      id: collectionId,
      type: 'collection'
    }
    team = new Team(team)

    return team.save().then(function (savedTeam) {
      expect(savedTeam.members).toEqual([])
      expect(savedTeam.object).toEqual(team.object)
      expect(savedTeam.teamType).toEqual(team.teamType)
      expect(savedTeam.name).toEqual(team.name)
    })
  })

  it('can save a team with members', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: collectionId,
      type: 'collection'
    }
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team.save().then(function (savedTeam) {
      teamId = savedTeam.id
      expect(savedTeam.members).toEqual([userId])
      expect(savedTeam.object).toEqual(team.object)
      expect(savedTeam.teamType).toEqual(team.teamType)
      expect(savedTeam.name).toEqual(team.name)
      return User.find(userId)
    }).then(function (user) {
      expect(user.teams).toEqual([teamId])
    })
  })

  it('can save a team with members based around a fragment', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: fragmentId,
      type: 'fragment'
    }
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team.save().then(function (savedTeam) {
      teamId = savedTeam.id
      expect(savedTeam.members).toEqual([userId])
      expect(savedTeam.object).toEqual(team.object)
      expect(savedTeam.teamType).toEqual(team.teamType)
      expect(savedTeam.name).toEqual(team.name)
      return User.find(userId)
    }).then(function (user) {
      expect(user.teams).toEqual([teamId])
    })
  })

  it('can update a team with members', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: collectionId,
      type: 'collection'
    }
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
      expect(savedTeam.members).toEqual([userId, adminId])
      expect(savedTeam.object).toEqual(team.object)
      expect(savedTeam.teamType).toEqual(team.teamType)
      expect(savedTeam.name).toEqual(team.name)
      return User.find(userId)
    }).then(function (user) {
      expect(user.teams).toEqual([teamId])
      return User.find(adminId)
    }).then(function (admin) {
      expect(admin.teams).toEqual([teamId])
    })
  })

  it('can delete a team with members', function () {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: collectionId,
      type: 'collection'
    }
    team.members = [userId]
    team = new Team(team)

    return team.save().then(
      savedTeam => Team.find(savedTeam.id)
    ).then(
      team => team.delete()
    ).then(
      deletedTeam => Team.find(deletedTeam.id)
    ).catch(err => {
      expect(err.name).toEqual("NotFoundError")
      if(err.name !== "NotFoundError") throw err
    }).then(
      () => User.find(userId)
    ).then(
      user => expect(user.teams).toEqual([])
    )
  })
})
