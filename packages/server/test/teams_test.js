const { Fragment, User, Collection, Team } = require('@pubsweet/models')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const userFixture = fixtures.user
const adminFixture = fixtures.adminUser
const collectionFixture = fixtures.collection
const teamFixture = fixtures.contributorTeam
const fragmentFixture = fixtures.fragment

describe('Teams model', () => {
  let adminId
  let userId
  let collectionId
  let fragmentId

  beforeEach(() =>
    dbCleaner()
      .then(() => new User(adminFixture).save())
      .then(admin => {
        adminId = admin.id
        return new User(userFixture).save()
      })
      .then(user => {
        userId = user.id
        return new Collection(collectionFixture).save()
      })
      .then(collection => {
        collectionId = collection.id
        return new Fragment(fragmentFixture).save()
      })
      .then(fragment => {
        fragmentId = fragment.id
      }),
  )

  it('can save a team without members', () => {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: collectionId,
      type: 'collection',
    }
    team = new Team(team)

    return team.save().then(savedTeam => {
      expect(savedTeam.members).toEqual([])
      expect(savedTeam.object).toEqual(team.object)
      expect(savedTeam.teamType).toEqual(team.teamType)
      expect(savedTeam.name).toEqual(team.name)
    })
  })

  it('can save a team with members', () => {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: collectionId,
      type: 'collection',
    }
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team
      .save()
      .then(savedTeam => {
        teamId = savedTeam.id
        expect(savedTeam.members).toEqual([userId])
        expect(savedTeam.object).toEqual(team.object)
        expect(savedTeam.teamType).toEqual(team.teamType)
        expect(savedTeam.name).toEqual(team.name)
        return User.find(userId)
      })
      .then(user => {
        expect(user.teams).toEqual([teamId])
      })
  })

  it('can save a global team', () => {
    let team = teamFixture
    team.name = 'Global test team'
    team.global = true
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team
      .save()
      .then(savedTeam => {
        teamId = savedTeam.id
        expect(savedTeam.members).toEqual([userId])
        expect(savedTeam.global).toEqual(team.global)
        expect(savedTeam.teamType).toEqual(team.teamType)
        expect(savedTeam.name).toEqual(team.name)
        return User.find(userId)
      })
      .then(user => {
        expect(user.teams).toEqual([teamId])
      })
  })

  it('can save a team with members based around a fragment', () => {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: fragmentId,
      type: 'fragment',
    }
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team
      .save()
      .then(savedTeam => {
        teamId = savedTeam.id
        expect(savedTeam.members).toEqual([userId])
        expect(savedTeam.object).toEqual(team.object)
        expect(savedTeam.teamType).toEqual(team.teamType)
        expect(savedTeam.name).toEqual(team.name)
        return User.find(userId)
      })
      .then(user => {
        expect(user.teams).toEqual([teamId])
      })
  })

  it('can update a team with members', () => {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: collectionId,
      type: 'collection',
    }
    team.members = [userId]
    team = new Team(team)

    let teamId

    return team
      .save()
      .then(savedTeam => Team.find(savedTeam.id))
      .then(team =>
        team.updateProperties({
          members: [userId, adminId],
        }),
      )
      .then(team => team.save())
      .then(savedTeam => {
        teamId = savedTeam.id
        expect(savedTeam.members).toEqual([userId, adminId])
        expect(savedTeam.object).toEqual(team.object)
        expect(savedTeam.teamType).toEqual(team.teamType)
        expect(savedTeam.name).toEqual(team.name)
        return User.find(userId)
      })
      .then(user => {
        expect(user.teams).toEqual([teamId])
        return User.find(adminId)
      })
      .then(admin => {
        expect(admin.teams).toEqual([teamId])
      })
  })

  it('can delete a team with members', () => {
    let team = teamFixture
    team.name = 'Test team'
    team.object = {
      id: collectionId,
      type: 'collection',
    }
    team.members = [userId]
    team = new Team(team)

    return team
      .save()
      .then(savedTeam => Team.find(savedTeam.id))
      .then(team => team.delete())
      .then(deletedTeam => Team.find(deletedTeam.id))
      .catch(err => {
        expect(err.name).toEqual('NotFoundError')
        if (err.name !== 'NotFoundError') throw err
      })
      .then(() => User.find(userId))
      .then(user => expect(user.teams).toEqual([]))
  })
})
