const { User } = require('@pubsweet/models')
const { fixtures } = require('@pubsweet/model-user/test')
const cleanDB = require('../helpers/db_cleaner')
const api = require('../helpers/api')
const authentication = require('../../src/authentication')
const errors = require('@pubsweet/errors')

describe('GraphQL errors', () => {
  let token
  let user

  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('should pass GraphQLError to clients', async () => {
    const { body } = await api.graphql.query(
      `mutation($input: UserInput) {
          createUser(input: $input) { invalidProperty }
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

    expect(body.errors).toHaveLength(1)
    expect(body.errors).toContainEqual({
      message: 'Cannot query field "invalidProperty" on type "User".',
      name: 'ValidationError',
      extensions: {
        code: 'GRAPHQL_VALIDATION_FAILED',
      },
    })
  })

  it('should pass AuthorizationError to clients', async () => {
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
      'invalid token',
    )

    expect(body.errors).toHaveLength(1)
    expect(body.errors[0].name).toBe(errors.AuthorizationError.name)
  })

  it('replaces errors that are not defined by pubsweet', async () => {
    const { body } = await api.graphql.query(
      `query($id: ID) {
          user(id: $id) {
            username
          }
        }`,
      { id: 'invalid id' },
      token,
    )

    expect(body.data).toEqual({ user: null })
    expect(body.errors).toHaveLength(1)
    expect(body.errors[0]).toEqual({
      name: 'Server Error',
      message: 'Something went wrong! Please contact your administrator',
    })
  })
})
