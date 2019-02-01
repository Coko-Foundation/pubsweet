const { Team, User } = require('@pubsweet/models')
const cleanDB = require('../helpers/db_cleaner')
const {
  fixtures: { user: userFixture },
} = require('@pubsweet/model-user/test')

const api = require('../helpers/api')
const authentication = require('../../src/authentication')

describe('GraphQL core queries', () => {
  let token
  let user
  beforeEach(async () => {
    await cleanDB()
    user = await new User(userFixture).save()
    token = authentication.token.create(user)
  })

  it('can resolve all users', async () => {
    const { body } = await api.graphql.query(
      `{ users { username } }`,
      {},
      token,
    )

    expect(body).toEqual({
      data: { users: [{ username: user.username }] },
    })
  })

  it('can resolve user by ID', async () => {
    const { body } = await api.graphql.query(
      `query($id: ID) {
          user(id: $id) {
            username
          }
        }`,
      { id: user.id },
      token,
    )

    expect(body).toEqual({
      data: { user: { username: user.username } },
    })
  })

  it('can resolve a query for a missing object', async () => {
    const { body } = await api.graphql.query(
      `query($id: ID) {
          user(id: $id) {
            username
          }
        }`,
      { id: '09e2fdec-a589-4104-b366-108b6e54f2b8' },
      token,
    )

    expect(body.data).toEqual({ user: null })
    expect(body.errors[0].message).toMatch('Object not found')
  })

  it('can resolve nested query', async () => {
    await Team.query().upsertGraph(
      {
        role: 'test',
        name: 'Test',
        users: [{ id: user.id }],
      },
      { relate: true, unrelate: true },
    )

    const { body } = await api.graphql.query(
      `{ users { username, teams { name, global } } }`,
      {},
      token,
    )

    expect(body).toEqual({
      data: {
        users: [
          {
            username: user.username,
            teams: [{ name: 'Test', global: null }],
          },
        ],
      },
    })
  })
})
