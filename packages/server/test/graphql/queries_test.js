const { model: User } = require('@pubsweet/model-user')
const { model: Team } = require('@pubsweet/model-team')
const cleanDB = require('../helpers/db_cleaner')
const fixtures = require('../fixtures/fixtures')
const api = require('../helpers/api')
const authentication = require('@pubsweet/model-user/src/authentication')

describe('GraphQL core queries', () => {
  let token
  let user
  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.adminUser).save()
    token = authentication.token.create(user)
  })

  it('can resolve all users', async () => {
    const { body } = await api.graphql.query(
      `{ users { username, admin } }`,
      {},
      token,
    )

    expect(body).toEqual({
      data: { users: [{ username: 'admin', admin: true }] },
    })
  })

  it('can resolve user by ID', async () => {
    const { body } = await api.graphql.query(
      `query($id: ID) {
          user(id: $id) {
            username
            admin
          }
        }`,
      { id: user.id },
      token,
    )

    expect(body).toEqual({
      data: { user: { username: 'admin', admin: true } },
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
    await new Team({ ...fixtures.contributorTeam, members: [user.id] }).save()
    const { body } = await api.graphql.query(
      `{ users { username, teams { name, global } } }`,
      {},
      token,
    )

    expect(body).toEqual({
      data: {
        users: [
          {
            username: 'admin',
            teams: [{ name: 'My contributors', global: null }],
          },
        ],
      },
    })
  })
})
