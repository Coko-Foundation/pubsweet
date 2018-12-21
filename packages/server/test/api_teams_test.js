const STATUS = require('http-status-codes')
const cloneDeep = require('lodash/cloneDeep')

const { Collection, User, Team } = require('../src/models')
const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const teamFixture = fixtures.contributorTeam
const api = require('./helpers/api')

describe('Teams API - admin', () => {
  beforeEach(() =>
    cleanDB()
      .then(() => new User(fixtures.adminUser).save())
      .then(() => new User(fixtures.user).save()),
  )

  it('should display an initially empty list of teams if user is admin', () =>
    api.users.authenticate
      .post(fixtures.adminUser)
      .then(token => api.teams.list(token).expect(STATUS.OK))
      .then(res => expect(res.body).toEqual([])))

  it('should display the existing teams if user is admin', () =>
    new Team(teamFixture)
      .save()
      .then(() => api.users.authenticate.post(fixtures.adminUser))
      .then(token => api.teams.list(token).expect(STATUS.OK))
      .then(res => {
        const team = res.body[0]
        expect(team.teamType).toEqual('teamContributors')
        expect(team.members).toEqual([])
      }))
  it('should allow retrieval of a team by id', () =>
    new Team(teamFixture)
      .save()
      .then(() => api.users.authenticate.post(fixtures.adminUser))
      .then(token =>
        api.teams.list(token).then(res => ({ teamId: res.body[0].id, token })),
      )
      .then(({ teamId, token }) =>
        api.teams.get(token, teamId).expect(STATUS.OK),
      )
      .then(res => {
        const team = res.body
        expect(team.teamType).toEqual('teamContributors')
        expect(team.members).toEqual([])
      }))

  it('should not allow listing all teams if user is not an admin', () =>
    api.users.authenticate
      .post(fixtures.user)
      .then(token => api.teams.list(token).expect(STATUS.FORBIDDEN)))
})

describe('Teams API - per collection or fragment', () => {
  describe('Collection teams', () => {
    describe('owners', () => {
      let collectionId
      let otherUserId
      let team

      beforeEach(() =>
        cleanDB()
          .then(() => new User(fixtures.user).save())
          .then(user => {
            const collection = new Collection(fixtures.collection)
            collection.setOwners([user.id])
            return collection.save()
          })
          .then(collection => {
            collectionId = collection.id
          })
          .then(() => new User(fixtures.updatedUser).save())
          .then(otherUser => {
            otherUserId = otherUser.id
          })
          .then(() => {
            team = cloneDeep(teamFixture)
          }),
      )

      it('can display an initially empty list of teams', () =>
        api.users.authenticate
          .post(fixtures.user)
          .then(token => api.teams.list(token, collectionId).expect(STATUS.OK))
          .then(res => expect(res.body).toEqual([])))

      it('can add a team with a team member to a collection and this team member can then create fragments', () => {
        team.name = 'Test team'
        team.members = [otherUserId]
        team.object = {
          id: collectionId,
          type: 'collection',
        }

        return api.users.authenticate
          .post(fixtures.user)
          .then(token => api.teams.post(team, token).expect(STATUS.CREATED))
          .then(res => {
            expect(res.body.name).toEqual(team.name)
          })
          .then(() => api.users.authenticate.post(fixtures.updatedUser))
          .then(token =>
            api.fragments
              .post({
                fragment: fixtures.fragment,
                collection: collectionId,
                token,
              })
              .expect(STATUS.CREATED),
          )
      })

      it('can remove a team member and that removed team member can no longer create fragments', () => {
        team.name = 'Test team'
        team.members = [otherUserId]
        team.object = {
          id: collectionId,
          type: 'collection',
        }

        return api.users.authenticate
          .post(fixtures.user)
          .then(token =>
            api.teams
              .post(team, token)
              .expect(STATUS.CREATED)
              .then(res => [res, token]),
          )
          .then(([res, token]) => {
            const savedTeam = res.body
            savedTeam.members = []
            return api.teams
              .patch(savedTeam, savedTeam.id, token)
              .expect(STATUS.OK)
          })
          .then(() => api.users.authenticate.post(fixtures.updatedUser))
          .then(token =>
            api.fragments
              .post({
                fragment: fixtures.fragment,
                collection: collectionId,
                token,
              })
              .expect(STATUS.FORBIDDEN),
          )
      })
    })

    describe('non-owners', () => {
      let collectionId

      beforeEach(() =>
        cleanDB()
          .then(() => new User(fixtures.user).save())
          .then(user => {
            const collection = new Collection(fixtures.collection)
            collection.setOwners([])
            return collection.save()
          })
          .then(collection => {
            collectionId = collection.id
          }),
      )

      it('should not see teams in a collection', () =>
        api.users.authenticate
          .post(fixtures.user)
          .then(token => api.teams.list(token, collectionId).expect(STATUS.OK))
          .then(res => {
            expect(res.body).toEqual([])
          }))
    })
  })
})
