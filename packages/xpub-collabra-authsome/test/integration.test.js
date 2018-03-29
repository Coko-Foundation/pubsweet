const { User, Collection, Team } = require('pubsweet-server/src/models')

// Perhaps these should be exported from server together?
const cleanDB = require('pubsweet-server/test/helpers/db_cleaner')
const fixtures = require('pubsweet-server/test/fixtures/fixtures')
const api = require('pubsweet-server/test/helpers/api')
const authentication = require('pubsweet-server/src/authentication')

let adminToken
let userToken
let admin
let user

const collectionPaper1 = {
  title: 'Paper 1',
  status: 'submitted',
}

describe('server integration', () => {
  beforeEach(async () => {
    await cleanDB()
    admin = await new User(fixtures.adminUser).save()
    user = await new User(fixtures.user).save()
    adminToken = authentication.token.create(admin)
    userToken = authentication.token.create(user)
  })

  describe('admin', () => {
    it('can create a collection with REST', async () => {
      const collection = await api.collections
        .create(collectionPaper1, adminToken)
        .expect(201)
        .then(res => res.body)

      expect(collection.type).toEqual(fixtures.collection.type)
    })

    it('can create a collection through GraphQL', async () => {
      const { body } = await api.graphql.query(
        `mutation($input: String) {
          createCollection(input: $input) { id, title, status }
        }`,
        {
          input: JSON.stringify(collectionPaper1),
        },
        adminToken,
      )
      expect(body.data.createCollection.title).toEqual(collectionPaper1.title)
    })
  })

  describe('user', () => {
    describe('REST', () => {
      it('can create a collection with REST', async () => {
        const collection = await api.collections
          .create(collectionPaper1, userToken)
          .expect(201)
          .then(res => res.body)

        expect(collection.type).toEqual(fixtures.collection.type)
      })
    })

    describe('GraphQL', () => {
      it('can create a collection with GraphQL', async () => {
        const { body } = await api.graphql.query(
          `mutation($input: String) {
            createCollection(input: $input) { id, title, status }
          }`,
          { input: JSON.stringify(collectionPaper1) },
          userToken,
        )
        expect(body.data.createCollection.title).toEqual(collectionPaper1.title)
      })
    })
  })

  describe('managing editor', () => {
    describe('REST', () => {
      let editorToken
      beforeEach(async () => {
        const editor = await new User(
          Object.assign({}, fixtures.user, {
            username: 'testeditor',
            email: 'testeditor@example.com',
          }),
        ).save()

        await new Team({
          name: 'Managing Editors',
          teamType: 'managingEditor',
          members: [editor.id],
        }).save()
        const paperA = new Collection({ title: 'Paper A' })
        const paperB = new Collection({ title: 'Paper B' })

        paperA.setOwners([user.id])
        paperB.setOwners([admin.id])
        await paperA.save()
        await paperB.save()

        editorToken = authentication.token.create(editor)
      })

      it('can list all collections', async () => {
        const collections = await api.collections
          .list(editorToken)
          .expect(200)
          .then(res => res.body)

        expect(collections).toHaveLength(2)
      })
    })
  })
})

// const collections = [
//   {
//     id: 'collection1',
//   },
//   {
//     id: 'collection2',
//   },
// ]

// const teams = [
//   {
//     id: 'team1',
//     teamType: 'Handling Editor',
//     object: {
//       id: 'collection2',
//       type: 'collection',
//     },
//   },
//   {
//     id: 'team2',
//     teamType: 'Senior Editor',
//     object: {
//       id: 'collection1',
//       type: 'collection',
//     },
//   },
//   {
//     id: 'team3',
//     teamType: 'Managing Editor',
//     // No associated object means this is a global team
//   },
// ]

// const users = [
//   {
//     id: 'user1',
//     username: 'handlingEditor1',
//     teams: ['team1'],
//   },
//   {
//     id: 'user2',
//     username: 'seniorEditor1',
//     teams: ['team2'],
//   },
//   {
//     id: 'user3',
//     username: 'managingEditor1',
//     teams: ['team3'],
//   },
//   {
//     id: 'adminId',
//     username: 'admin',
//     admin: true,
//   },
// ]

// describe('admin', () => {
//   it('allows everything to an admin', async () => {
//     const permission = await authsome.can(
//       'adminId',
//       'DELETE',
//       'thisSensitiveThing',
//     )
//     expect(permission).toBe(true)
//   })
// })

// describe('Handling Editor', () => {
//   it('lists only collections where user is a member of the handling editors team', async () => {
//     const permission = await authsome.can('user1', 'GET', {
//       path: '/collections',
//     })
//     const filteredCollections = await permission.filter(collections)
//     expect(filteredCollections).toEqual([collections[1]])
//   })
// })

// describe('Senior Editor', () => {
//   it('lists only collections where user is a member of the senior editors team', async () => {
//     const permission = await authsome.can('user2', 'GET', {
//       path: '/collections',
//     })
//     const filteredCollections = await permission.filter(collections)
//     expect(filteredCollections).toEqual([collections[0]])
//   })
// })

// describe('Managing Editor', () => {
//   it('can list all collections', async () => {
//     const permission = await authsome.can('user3', 'GET', {
//       path: '/collections',
//     })
//     expect(permission).toBe(true)
//   })
// })
