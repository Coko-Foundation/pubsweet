process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/model-fragment",
    "@pubsweet/model-team-member"
  ]
}}`

const { model: User } = require('@pubsweet/model-user')
const { model: Fragment } = require('@pubsweet/model-fragment')

const { dbCleaner, api } = require('pubsweet-server/test')

const fixtures = require('pubsweet-server/test/fixtures/fixtures')
const authentication = require('@pubsweet/model-user/src/authentication')

const Team = require('../src/team')

describe('Team queries', () => {
  let token
  let user

  const whereQuery = async where => {
    const { body } = await api.graphql.query(
      `query($where: TeamInput) {
          teams(where: $where) {
            name
          }
        }`,
      {
        where,
      },
      token,
    )
    return body
  }

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('creates a team', async () => {
    const { body } = await api.graphql.query(
      `mutation($input: TeamInput) {
        createTeam(input: $input) {
          name
          members {
            id
          }
        }
      }`,
      {
        input: {
          name: 'My team',
          role: 'test',
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        createTeam: {
          name: 'My team',
          members: [],
        },
      },
    })
  })

  it('finds a team', async () => {
    const team = await new Team({ role: 'test', name: 'Test' }).save()

    const { body } = await api.graphql.query(
      `query($id: ID) {
        team(id: $id) {
          name
        }
      }`,
      { id: team.id },
      token,
    )
    expect(body.data.team.name).toEqual('Test')
  })

  it('finds a team by role', async () => {
    await new Team({ role: 'test1', name: 'Test1' }).save()
    await new Team({ role: 'test', name: 'Test' }).save()

    const body = await whereQuery({
      role: 'test',
    })

    expect(body.data.teams).toHaveLength(1)
    expect(body.data.teams[0].name).toEqual('Test')
  })

  it('find a team by role and object', async () => {
    const fragment = await new Fragment({ fragmentType: 'post' }).save()

    await Team.query().upsertGraph(
      {
        role: 'test',
        name: 'Test',
        object: {
          objectId: fragment.id,
          objectType: 'fragment',
        },
        members: [
          {
            '#dbRef': user.id,
          },
        ],
      },
      { relate: true, unrelate: true },
    )

    const body = await whereQuery({
      role: 'test',
      object: {
        objectId: fragment.id,
        objectType: 'fragment',
      },
    })

    expect(body.data.teams).toHaveLength(1)
  })

  describe('find a team by role, object, and member', () => {
    let fragment
    let user2

    beforeEach(async () => {
      fragment = await new Fragment({ fragmentType: 'post' }).save()
      user2 = await new User({
        email: 'hi@example.com',
        username: 'test2',
      }).save()

      await Team.query().upsertGraph(
        {
          role: 'test',
          name: 'Test',
          object: {
            objectId: fragment.id,
            objectType: 'fragment',
          },
          members: [
            {
              '#dbRef': user.id,
            },
            {
              '#dbRef': user2.id,
            },
          ],
        },
        { relate: true, unrelate: true },
      )
    })

    it('finds a team for 1 member', async () => {
      const body = await whereQuery({
        role: 'test',
        object: {
          objectId: fragment.id,
          objectType: 'fragment',
        },
        members: [user.id],
      })

      expect(body.data.teams).toHaveLength(1)
    })

    it('finds a team for both members', async () => {
      const body = await whereQuery({
        role: 'test',
        object: {
          objectId: fragment.id,
          objectType: 'fragment',
        },
        members: [user.id, user2.id],
      })

      expect(body.data.teams).toHaveLength(1)
    })

    it('does not find a team for non-existent member', async () => {
      const body = await whereQuery({
        role: 'test',
        object: {
          objectId: fragment.id,
          objectType: 'fragment',
        },
        members: ['54513de6-b473-4b39-8f95-bcbb3ae58a2a'],
      })

      expect(body.data.teams).toHaveLength(0)
    })

    it('does not find a team if missing one of the members', async () => {
      const body = await whereQuery({
        role: 'test',
        object: {
          objectId: fragment.id,
          objectType: 'fragment',
        },
        members: [user.id, user2.id, '54513de6-b473-4b39-8f95-bcbb3ae58a2a'],
      })

      expect(body.data.teams).toHaveLength(0)
    })
  })

  it('adds members to a team', async () => {
    const team = await new Team({ role: 'test', name: 'Test' }).save()

    const { body } = await api.graphql.query(
      `mutation($id: ID!, $members: [ID!]!) {
        addMembers(id: $id, members: $members) {
          name
          members {
            id
          }
        }
      }`,
      {
        id: team.id,
        members: [user.id],
      },
      token,
    )

    expect(body).toEqual({
      data: {
        addMembers: {
          name: 'Test',
          members: [{ id: user.id }],
        },
      },
    })
  })

  it('removes members from a team', async () => {
    const team = await Team.query().upsertGraphAndFetch(
      {
        role: 'test',
        name: 'Test',
        members: [
          {
            '#dbRef': user.id,
          },
        ],
      },
      { relate: true, unrelate: true },
    )

    const { body } = await api.graphql.query(
      `mutation($id: ID!, $members: [ID!]!) {
        removeMembers(id: $id, members: $members) {
          name
          members {
            id
          }
        }
      }`,
      {
        id: team.id,
        members: [user.id],
      },
      token,
    )

    expect(body).toEqual({
      data: {
        removeMembers: {
          name: 'Test',
          members: [],
        },
      },
    })
  })

  //   it('can find manuscript by id', async () => {
  //     const manuscript = await new Manuscript({ title: '1' }).save()

  //     const { body } = await api.graphql.query(
  //       `query($id: ID) {
  //         manuscript(id: $id) {
  //           title
  //         }
  //       }`,
  //       { id: manuscript.id },
  //       token,
  //     )
  //     expect(body.data.manuscript.title).toEqual('1')
  //   })

  //   it('can update a manuscript', async () => {
  //     const manuscript = await new Manuscript({ title: 'Before' }).save()
  //     const { body } = await api.graphql.query(
  //       `mutation($id: ID, $input: ManuscriptInput) {
  //         updateManuscript(id: $id, input: $input) { title }
  //       }`,
  //       {
  //         id: manuscript.id,
  //         input: {
  //           title: 'After',
  //         },
  //       },
  //       token,
  //     )

  //     expect(body).toEqual({
  //       data: {
  //         updateManuscript: { title: 'After' },
  //       },
  //     })
  //   })

  //   it('can delete a manuscript', async () => {
  //     const manuscript = await new Manuscript({ title: 'To delete' }).save()
  //     const { body } = await api.graphql.query(
  //       `mutation($id: ID) {
  //         deleteManuscript(id: $id) { title }
  //       }`,
  //       { id: manuscript.id },
  //       token,
  //     )

  //     expect(body).toEqual({
  //       data: { deleteManuscript: { title: 'To delete' } },
  //     })
  //   })
  // })

  // const STATUS = require('http-status-codes')
  // const cloneDeep = require('lodash/cloneDeep')

  // const { Collection, User, Team } = require('@pubsweet/models')

  // const cleanDB = require('./helpers/db_cleaner')
  // const fixtures = require('./fixtures/fixtures')

  // const teamFixture = fixtures.contributorTeam
  // const api = require('./helpers/api')

  // describe('Teams API - admin', () => {
  //   beforeEach(() =>
  //     cleanDB()
  //       .then(() => new User(fixtures.adminUser).save())
  //       .then(() => new User(fixtures.user).save()),
  //   )

  //   it('should display an initially empty list of teams if user is admin', () =>
  //     api.users.authenticate
  //       .post(fixtures.adminUser)
  //       .then(token => api.teams.list(token).expect(STATUS.OK))
  //       .then(res => expect(res.body).toEqual([])))

  //   it('should display the existing teams if user is admin', () =>
  //     new Team(teamFixture)
  //       .save()
  //       .then(() => api.users.authenticate.post(fixtures.adminUser))
  //       .then(token => api.teams.list(token).expect(STATUS.OK))
  //       .then(res => {
  //         const team = res.body[0]
  //         expect(team.teamType).toEqual('teamContributors')
  //         expect(team.members).toEqual([])
  //       }))
  //   it('should allow retrieval of a team by id', () =>
  //     new Team(teamFixture)
  //       .save()
  //       .then(() => api.users.authenticate.post(fixtures.adminUser))
  //       .then(token =>
  //         api.teams.list(token).then(res => ({ teamId: res.body[0].id, token })),
  //       )
  //       .then(({ teamId, token }) =>
  //         api.teams.get(token, teamId).expect(STATUS.OK),
  //       )
  //       .then(res => {
  //         const team = res.body
  //         expect(team.teamType).toEqual('teamContributors')
  //         expect(team.members).toEqual([])
  //       }))

  //   it('should not allow listing all teams if user is not an admin', () =>
  //     api.users.authenticate
  //       .post(fixtures.user)
  //       .then(token => api.teams.list(token).expect(STATUS.FORBIDDEN)))
  // })

  // describe('Teams API - per collection or fragment', () => {
  //   describe('Collection teams', () => {
  //     describe('owners', () => {
  //       let collectionId
  //       let otherUserId
  //       let team

  //       beforeEach(() =>
  //         cleanDB()
  //           .then(() => new User(fixtures.user).save())
  //           .then(user => {
  //             const collection = new Collection(fixtures.collection)
  //             collection.setOwners([user.id])
  //             return collection.save()
  //           })
  //           .then(collection => {
  //             collectionId = collection.id
  //           })
  //           .then(() => new User(fixtures.updatedUser).save())
  //           .then(otherUser => {
  //             otherUserId = otherUser.id
  //           })
  //           .then(() => {
  //             team = cloneDeep(teamFixture)
  //           }),
  //       )

  //       it('can display an initially empty list of teams', () =>
  //         api.users.authenticate
  //           .post(fixtures.user)
  //           .then(token => api.teams.list(token, collectionId).expect(STATUS.OK))
  //           .then(res => expect(res.body).toEqual([])))

  //       it('can add a team with a team member to a collection and this team member can then create fragments', () => {
  //         team.name = 'Test team'
  //         team.members = [otherUserId]
  //         team.object = {
  //           id: collectionId,
  //           type: 'collection',
  //         }

  //         return api.users.authenticate
  //           .post(fixtures.user)
  //           .then(token => api.teams.post(team, token).expect(STATUS.CREATED))
  //           .then(res => {
  //             expect(res.body.name).toEqual(team.name)
  //           })
  //           .then(() => api.users.authenticate.post(fixtures.updatedUser))
  //           .then(token =>
  //             api.fragments
  //               .post({
  //                 fragment: fixtures.fragment,
  //                 collection: collectionId,
  //                 token,
  //               })
  //               .expect(STATUS.CREATED),
  //           )
  //       })

  //       it('can remove a team member and that removed team member can no longer create fragments', () => {
  //         team.name = 'Test team'
  //         team.members = [otherUserId]
  //         team.object = {
  //           id: collectionId,
  //           type: 'collection',
  //         }

  //         return api.users.authenticate
  //           .post(fixtures.user)
  //           .then(token =>
  //             api.teams
  //               .post(team, token)
  //               .expect(STATUS.CREATED)
  //               .then(res => [res, token]),
  //           )
  //           .then(([res, token]) => {
  //             const savedTeam = res.body
  //             savedTeam.members = []
  //             return api.teams
  //               .patch(savedTeam, savedTeam.id, token)
  //               .expect(STATUS.OK)
  //           })
  //           .then(() => api.users.authenticate.post(fixtures.updatedUser))
  //           .then(token =>
  //             api.fragments
  //               .post({
  //                 fragment: fixtures.fragment,
  //                 collection: collectionId,
  //                 token,
  //               })
  //               .expect(STATUS.FORBIDDEN),
  //           )
  //       })
  //     })

  //     describe('non-owners', () => {
  //       let collectionId

  //       beforeEach(() =>
  //         cleanDB()
  //           .then(() => new User(fixtures.user).save())
  //           .then(user => {
  //             const collection = new Collection(fixtures.collection)
  //             collection.setOwners([])
  //             return collection.save()
  //           })
  //           .then(collection => {
  //             collectionId = collection.id
  //           }),
  //       )

  //       it('should not see teams in a collection', () =>
  //         api.users.authenticate
  //           .post(fixtures.user)
  //           .then(token => api.teams.list(token, collectionId).expect(STATUS.OK))
  //           .then(res => {
  //             expect(res.body).toEqual([])
  //           }))
  //     })
  //   })
})
