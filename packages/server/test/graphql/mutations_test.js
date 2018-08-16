const User = require('../../src/models/User')
const cleanDB = require('../helpers/db_cleaner')
const fixtures = require('../fixtures/fixtures')
const api = require('../helpers/api')
const authentication = require('../../src/authentication')

describe('GraphQL core mutations', () => {
  let token
  let user
  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.adminUser).save()
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
        data: { deleteUser: { username: 'admin' } },
      })
    })

    it('can create a team', async () => {
      const { body } = await api.graphql.query(
        `mutation($input: TeamInput) {
          createTeam(input: $input) {
            name
            object {
              objectId
              objectType
            }
          }
        }`,
        {
          input: {
            name: 'Awesome Team',
            teamType: 'awesome',
            object: {
              objectId: user.id,
              objectType: 'user',
            },
            members: [user.id],
          },
        },
        token,
      )

      expect(body).toEqual({
        data: {
          createTeam: {
            name: 'Awesome Team',
            object: {
              objectId: user.id,
              objectType: 'user',
            },
          },
        },
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
