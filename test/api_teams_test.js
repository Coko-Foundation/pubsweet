const STATUS = require('http-status-codes')
const cloneDeep = require('lodash/cloneDeep')

const Collection = require('../src/models/Collection')
const User = require('../src/models/User')
const Team = require('../src/models/Team')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const contributors = fixtures.teams.contributors
const teamFixture = fixtures.contributorTeam
const api = require('./helpers/api')

describe('Teams API - admin', () => {
  beforeEach(() => {
    return cleanDB().then(
      () => { return new User(fixtures.adminUser).save() }
    ).then(
      () => { return new User(fixtures.user).save() }
    )
  })

  it('should display an initially empty list of teams if user is admin', () => {
    return api.users.authenticate.post(
      fixtures.adminUser
    ).then(
      token => api.teams.list(token).expect(STATUS.OK)
    ).then(
      res => expect(res.body).toEqual([])
    )
  })

  it('should display the existing teams if user is admin', () => {
    return new Team(
      teamFixture
    ).save().then(
      () => api.users.authenticate.post(fixtures.adminUser)
    ).then(
      token => api.teams.list(token).expect(STATUS.OK)
    ).then(
      res => {
        let team = res.body[0]
        expect(team.teamType.name).toEqual(contributors.name)
        expect(team.members).toEqual([])
      }
    )
  })

  it('should allow retrieval of a team by id', () => {
    return new Team(
      teamFixture
    ).save().then(
      () => api.users.authenticate.post(fixtures.adminUser)
    ).then(
      token => api.teams.list(token).then(res => ({teamId: res.body[0].id, token}))
    ).then(
      ({teamId, token}) => api.teams.get(token, teamId).expect(STATUS.OK)
    ).then(
      res => {
        const team = res.body
        expect(team.teamType.name).toEqual(contributors.name)
        expect(team.members).toEqual([])
      })
  })

  it('should not allow listing all teams if user is not an admin', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => api.teams.list(token).expect(STATUS.FORBIDDEN)
    )
  })
})

describe('Teams API - per collection or fragment', () => {
  describe('Collection teams', () => {
    describe('owners', () => {
      let collectionId
      let otherUserId
      let team

      beforeEach(() => {
        return cleanDB().then(
          () => new User(fixtures.user).save()
        ).then(
          user => {
            let collection = new Collection(fixtures.collection)
            collection.setOwners([user.id])
            return collection.save()
          }
        ).then(
          collection => { collectionId = collection.id }
        ).then(
          () => new User(fixtures.updatedUser).save()
        ).then(
          otherUser => { otherUserId = otherUser.id }
        ).then(
          () => { team = cloneDeep(teamFixture) }
        )
      })

      it('can display an initially empty list of teams', () => {
        return api.users.authenticate.post(
          fixtures.user
        ).then(
          token => api.teams.list(token, collectionId).expect(STATUS.OK)
        ).then(
          res => expect(res.body).toEqual([])
        )
      })

      it('can add a team with a team member to a collection and this team member can then create fragments', () => {
        team.name = 'Test team'
        team.members = [otherUserId]
        team.object = {
          id: collectionId,
          type: 'collection'
        }

        return api.users.authenticate.post(
          fixtures.user
        ).then(
          token => api.teams.post(
            team, token
          ).expect(
            STATUS.CREATED
          )
        ).then(
          res => {
            teamId = res.body.id
            expect(res.body.name).toEqual(team.name)
          }
        ).then(
          () => api.users.authenticate.post(fixtures.updatedUser)
        ).then(
          token => api.fragments.post(
            fixtures.fragment, collectionId, token
          ).expect(
            STATUS.CREATED
          )
        )
      })

      it('can remove a team member and that removed team member can no longer create fragments', () => {
        team.name = 'Test team'
        team.members = [otherUserId]
        team.object = {
          id: collectionId,
          type: 'collection'
        }

        return api.users.authenticate.post(
          fixtures.user
        ).then(
          token => api.teams.post(
            team, token
          ).expect(
            STATUS.CREATED
          ).then(
            res => [res, token]
          )
        ).then(
          ([res, token]) => {
            const savedTeam = res.body
            savedTeam.members = []
            return api.teams.patch(
              savedTeam, savedTeam.id, token
            ).expect(
              STATUS.OK
            )
          }
        ).then(
          () => api.users.authenticate.post(fixtures.updatedUser)
        ).then(
          token => api.fragments.post(
            fixtures.fragment, collectionId, token
          ).expect(
            STATUS.FORBIDDEN
          )
        )
      })
    })

    describe('non-owners', () => {
      let collectionId

      beforeEach(() => {
        return cleanDB().then(
          () => new User(fixtures.user).save()
        ).then(
          user => {
            let collection = new Collection(fixtures.collection)
            collection.owners = []
            return collection.save()
          }
        ).then(
          collection => { collectionId = collection.id }
        )
      })

      it('should not see teams in a collection', () => {
        return api.users.authenticate.post(
          fixtures.user
        ).then(
          token => api.teams.list(token, collectionId).expect(STATUS.OK)
        ).then(res => {
          expect(res.body).toEqual([])
        })
      })
    })
  })
})
