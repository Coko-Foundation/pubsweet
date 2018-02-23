const User = require('../../src/models/User')
const Team = require('../../src/models/Team')
const cleanDB = require('../helpers/db_cleaner')
const fixtures = require('../fixtures/fixtures')
const api = require('../helpers/api')
const authentication = require('../../src/authentication')

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

  it('can resolve nested query', async () => {
    await new Team({ ...fixtures.contributorTeam, members: [user.id] }).save()
    const { body } = await api.graphql.query(
      `{ users { username, teams { name } } }`,
      {},
      token,
    )

    expect(body).toEqual({
      data: {
        users: [{ username: 'admin', teams: [{ name: 'My contributors' }] }],
      },
    })
  })
})
