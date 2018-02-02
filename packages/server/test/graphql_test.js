const { omit } = require('lodash')
const authsome = require('../src/helpers/authsome')
const User = require('../src/models/User')
const Team = require('../src/models/Team')
const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')
const api = require('./helpers/api')
const authentication = require('../src/authentication')

describe('GraphQL endpoint', () => {
  let token
  let user
  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.adminUser).save()
    token = authentication.token.create(user)
  })

  describe('queries', () => {
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

  describe('mutations', () => {
    it('can create a user', async () => {
      const { body } = await api.graphql.query(
        `mutation($input: UserInput) { 
          createUser(input: $input) { username } 
        }`,
        {
          input: {
            username: 'floobs',
            email: 'nobody@example.com',
            password: 'password',
          },
        },
        token,
      )

      expect(body).toEqual({
        data: {
          createUser: { username: 'floobs' },
        },
      })
    })

    it('can update a user', async () => {
      const { body } = await api.graphql.query(
        `mutation($id: ID, $input: UserInput) { 
          updateUser(id: $id, input: $input) { username, email } 
        }`,
        {
          id: user.id,
          input: {
            username: 'floobs',
            email: 'nobody@example.com',
            rev: user.rev,
          },
        },
        token,
      )

      expect(body).toEqual({
        data: {
          updateUser: { username: 'floobs', email: 'nobody@example.com' },
        },
      })
    })

    it('can delete a user', async () => {
      const { body } = await api.graphql.query(
        `mutation($id: ID) { 
          deleteUser(id: $id) { username } 
        }`,
        { id: user.id },
        token,
      )

      expect(body).toEqual({
        data: { deleteUser: { username: 'admin' } },
      })
    })
  })

  describe('auth', () => {
    it('can log in', async () => {
      const { body } = await api.graphql.query(
        `mutation($input: LoginUserInput) {
          loginUser(input: $input) {
            user { username }
            token
          }
        }`,
        { input: { username: 'admin', password: 'admin' } },
      )

      expect(body).toMatchObject({
        data: {
          loginUser: { token: expect.any(String), user: { username: 'admin' } },
        },
      })
    })

    it('blocks invalid login', async () => {
      const { body } = await api.graphql.query(
        `mutation($input: LoginUserInput) {
          loginUser(input: $input) {
            token
          }
        }`,
        { input: { username: 'admin', password: 'not correct' } },
      )

      expect(body).toMatchObject({
        data: { loginUser: null },
        errors: [{ message: 'Wrong username or password.' }],
      })
    })

    it('fetches current user from token', async () => {
      const { body } = await api.graphql.query(
        `{ currentUser { user { username, email } token} }`,
        {},
        token,
      )

      expect(body).toMatchObject({
        data: {
          currentUser: {
            user: { username: 'admin', email: 'admin@admins.example.org' },
            token: expect.any(String),
          },
        },
      })
    })

    it('errors when unauthenticated', async () => {
      const { body } = await api.graphql.query(`{ users { username } }`)

      expect(body).toMatchObject({
        data: { users: null },
        errors: [{ message: 'Operation not permitted: read users' }],
      })
    })

    it('filters the returned data', async () => {
      jest
        .spyOn(authsome, 'can')
        .mockReturnValue({ filter: user => omit(user, 'admin') })

      const { body } = await api.graphql.query(
        `{ users { username, admin } }`,
        {},
        token,
      )

      expect(body).toEqual({
        data: { users: [{ username: 'admin', admin: null }] },
      })
    })

    it('returns not found if not authorized', async () => {
      jest
        .spyOn(authsome, 'can')
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)

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

      expect(body).toMatchObject({
        data: { user: null },
        errors: [{ message: `Object not found: user with id ${user.id}` }],
      })
    })
  })
})
