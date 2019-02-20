const { model: User } = require('@pubsweet/model-user')
const { fixtures } = require('@pubsweet/model-user/test')
const cleanDB = require('../helpers/db_cleaner')
const api = require('../helpers/api')
const authentication = require('../../src/authentication')

describe('GraphQL errors', () => {
  let token
  let user

  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('should pass graphql errors to clients', async () => {
    const { body } = await api.graphql.query(
      `mutation($input: UserInput) {
          createUser(input: $input) { invalidProp }
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
      message: 'Cannot query field "invalidProp" on type "User".',
      name: 'GraphQLError',
    })
  })
})
