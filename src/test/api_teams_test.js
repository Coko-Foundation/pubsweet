const STATUS = require('http-status-codes')
const expect = require('expect.js')
const cloneDeep = require('lodash/cloneDeep')

const Collection = require('../models/Collection')
const User = require('../models/User')
const Team = require('../models/Team')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const contributors = fixtures.teams.contributors
const teamFixture = fixtures.team
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
      token => api.teams.get(token).expect(STATUS.OK)
    ).then(
      res => expect(res.body).to.eql([])
    )
  })

  it('should display the existing teams if user is admin', () => {
    return new Team(
      teamFixture
    ).save().then(
      () => api.users.authenticate.post(fixtures.adminUser)
    ).then(
      token => api.teams.get(token).expect(STATUS.OK)
    ).then(
      res => {
        let team = res.body[0]
        console.log(team)
        expect(team.teamType.name).to.eql(teamFixture.teamType.name)
        expect(team.members).to.eql([])
      }
    )
  })

  it('should not allow listing all teams if user is not an admin', () => {
    return api.users.authenticate.post(
      fixtures.user
    ).then(
      token => api.teams.get(token).expect(STATUS.FORBIDDEN)
    )
  })
})

describe('Teams API - per collection or fragment', () => {
  describe('Collection teams', () => {
    describe('owners', () => {
      let collectionId
      let otherUserId
      let teamId
      let team

      beforeEach(() => {
        return cleanDB().then(
          () => new User(fixtures.user).save()
        ).then(
          user => {
            let collection = new Collection(fixtures.collection)
            collection.owners = [user]
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
          token => api.teams.get(token, collectionId).expect(STATUS.OK)
        ).then(
          res => expect(res.body).to.eql([])
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
            team, collectionId, token
          ).expect(
            STATUS.CREATED
          )
        ).then(
          res => {
            teamId = res.body.id
            expect(res.body.name).to.eql(team.name)
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
            team, collectionId, token
          ).expect(
            STATUS.CREATED
          ).then(
            res => [res, token]
          )
        ).then(
          ([res, token]) => {
            teamId = res.body.id
            team.members = []
            return api.teams.put(
              team, collectionId, teamId, token
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

      it('should not be authorized to see teams for a collection', () => {
        return api.users.authenticate.post(
          fixtures.user
        ).then(
          token => api.teams.get(token, collectionId).expect(STATUS.FORBIDDEN)
        )
      })
    })
  })
})
