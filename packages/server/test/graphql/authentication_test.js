const { omit } = require('lodash')
const authsome = require('../../src/helpers/authsome')
const { User } = require('@pubsweet/models')
const { fixtures } = require('@pubsweet/model-user/test')
const cleanDB = require('../helpers/db_cleaner')
const api = require('../helpers/api')
const authentication = require('../../src/authentication')

describe('GraphQL authentication', () => {
  let token
  let user
  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  describe('loginUser mutation', () => {
    it('can log in', async () => {
      const { body } = await api.graphql.query(
        `mutation($input: LoginUserInput) {
          loginUser(input: $input) {
            user { username }
            token
          }
        }`,
        { input: { username: 'testuser', password: 'test' } },
      )

      expect(body).toMatchObject({
        data: {
          loginUser: {
            token: expect.any(String),
            user: { username: 'testuser' },
          },
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
        { input: { username: 'testuser', password: 'not correct' } },
      )

      expect(body).toMatchObject({
        data: { loginUser: null },
        errors: [
          {
            name: 'AuthorizationError',
            message: 'Wrong username or password.',
          },
        ],
      })
    })
  })

  describe('currentUser query', () => {
    it('returns null when unauthenticated', async () => {
      const { body } = await api.graphql.query(
        `{ currentUser { username, email} }`,
      )

      expect(body).toMatchObject({
        data: {
          currentUser: null,
        },
      })
    })

    it('fetches current user from token', async () => {
      const { body } = await api.graphql.query(
        `{ currentUser { username, email, teams { role }} }`,
        {},
        token,
      )

      expect(body).toMatchObject({
        data: {
          currentUser: {
            username: 'testuser',
            email: 'test@example.com',
            teams: [],
          },
        },
      })
    })

    it('errors when user not found', async () => {
      const badToken = authentication.token.create({
        id: '123e4567-e89b-12d3-a456-426655440000',
        username: 'does not exist',
      })
      const { body } = await api.graphql.query(
        `{ currentUser { username, email} }`,
        {},
        badToken,
      )

      expect(body).toMatchObject({
        data: {
          currentUser: null,
        },
        errors: [
          {
            message:
              'Object not found: User with id 123e4567-e89b-12d3-a456-426655440000',
          },
        ],
      })
    })
  })

  describe('user query', () => {
    it('errors when unauthenticated', async () => {
      const { body } = await api.graphql.query(`{ users { username } }`)

      expect(body).toMatchObject({
        data: { users: null },
        errors: [
          {
            message:
              'Operation not permitted: unauthenticated users cannot perform read operation on User',
          },
        ],
      })
    })

    it('filters the returned data', async () => {
      jest
        .spyOn(authsome, 'can')
        .mockReturnValue({ filter: user => omit(user, 'email') })

      const { body } = await api.graphql.query(
        `{ users { username, email } }`,
        {},
        token,
      )

      expect(body).toEqual({
        data: { users: [{ username: 'testuser', email: null }] },
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
