const { model: User } = require('@pubsweet/model-user')
const { fixtures } = require('@pubsweet/model-user/test')
const cleanDB = require('../helpers/db_cleaner')
const api = require('../helpers/api')
const authentication = require('../../src/authentication')

describe('GraphQL core mutations', () => {
  let token
  let user

  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
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
        data: { deleteUser: { username: 'testuser' } },
      })
    })

    it('sets owners when creating a collection', async () => {
      const { body } = await api.graphql.query(
        `mutation($input: CollectionInput) {
          createCollection(input: $input) {
            owners {
              id
            }
          }
        }`,
        {
          input: {},
        },
        token,
      )

      expect(body).toEqual({
        data: {
          createCollection: {
            owners: [{ id: user.id }],
          },
        },
      })
    })
  })
})
