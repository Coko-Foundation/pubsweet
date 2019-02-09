process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team"
  ]
}}`

const User = require('../src/user')
const { dbCleaner, api } = require('pubsweet-server/test')

const { fixtures } = require('@pubsweet/model-user/test')
const authentication = require('pubsweet-server/src/authentication')

describe('User mutations', () => {
  // let token
  // let user

  beforeEach(async () => {
    await dbCleaner()
    // user = await new User(fixtures.user).save()
    // token = authentication.token.create(user)
  })

  it('a user can sign up', async () => {
    const { body } = await api.graphql.query(
      `mutation($input: UserInput) {
        createUser(input: $input) {
          username
        }
      }`,
      {
        input: {
          username: 'hi',
          email: 'hi@example.com',
          password: 'hello',
        },
      },
    )

    expect(body).toEqual({
      data: {
        createUser: {
          username: 'hi',
        },
      },
    })
  })

  it('a user can update a password', async () => {
    const user = await new User(fixtures.user).save()
    const token = authentication.token.create(user)

    const { body } = await api.graphql.query(
      `mutation($id: ID, $input: UserInput) {
        updateUser(id: $id, input: $input) {
          username
        }
      }`,
      {
        id: user.id,
        input: {
          username: 'hi',
          email: 'hi@example.com',
          password: 'hello2',
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        updateUser: {
          username: 'hi',
        },
      },
    })

    const oldHash = user.passwordHash
    const newHash = await User.find(user.id).passwordHash

    expect(oldHash).not.toEqual(newHash)
  })
})
