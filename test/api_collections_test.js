const STATUS = require('http-status-codes')

const User = require('../src/models/User')

const cleanDB = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const api = require('./helpers/api')

const authenticateAdmin = () => {
  return api.users.authenticate.post(fixtures.adminUser)
}

const authenticateUser = () => {
  return api.users.authenticate.post(fixtures.user)
}

describe('Collections API', () => {
  beforeEach(() => {
    return cleanDB().then(() => Promise.all([
      new User(fixtures.adminUser).save(),
      new User(fixtures.user).save()
    ]))
  })

  describe('admin', () => {
    it('should display an initially empty list of collections', async () => {
      const adminToken = await authenticateAdmin()

      // list all the collections
      const collections = await api.collections.list(adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections).toEqual([])
    })

    it('should allow an admin user to create a collection (without filtering properties)', async () => {
      const adminToken = await authenticateAdmin()

      const collection = await api.collections.create(
        Object.assign({}, fixtures.collection, {filtered: 'example'}), adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)
      expect(collection.type).toEqual(fixtures.collection.type)
      expect(collection.title).toEqual(fixtures.collection.title)
      expect(collection.filtered).toEqual('example')
    })

    it('should allow an admin user to list all collections', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)

      // list all the collections
      const collections = await api.collections.list(adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections).toHaveLength(1)

      const collection = collections[0]
      expect(collection.type).toEqual(fixtures.collection.type)
      expect(collection.title).toEqual(fixtures.collection.title)
    })

    it('should allow an admin user to filter collections with query params', async () => {
      const adminToken = await authenticateAdmin()

      await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
      await api.collections.create(fixtures.collection2, adminToken)
        .expect(STATUS.CREATED)

      const query1 = {'owners.0.username': 'admin'}

      const collections1 = await api.collections.list(adminToken, query1)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections1).toHaveLength(2)

      const query2 = {'title': fixtures.collection.title}

      const collections2 = await api.collections.list(adminToken, query2)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections2).toHaveLength(1)
    })

    it('should return empty array if filtering on non-existent property', async () => {
      const adminToken = await authenticateAdmin()

      await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
      await api.collections.create(fixtures.collection2, adminToken)
        .expect(STATUS.CREATED)

      const query = {'nonexistent': 'x'}

      const collections = await api.collections.list(adminToken, query)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections).toHaveLength(0)
    })

    it('collection.owners should be augmented with usernames (both singular and plural endpoints)', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // retrieve the collection
      const retrievedCollection = await api.collections.retrieve(collection.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(retrievedCollection.owners[0]).toHaveProperty('username', fixtures.adminUser.username)

      // list all the collections
      const collections = await api.collections.list(adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections[0].owners[0]).toHaveProperty('username', fixtures.adminUser.username)
    })

    it('should allow an admin user to retrieve only some fields of collections', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)

      // list all the collections, asking for all fields
      const collections = await api.collections.list(adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections).toHaveLength(1)

      const collection = collections[0]
      expect(collection).toHaveProperty('id')
      expect(collection).toHaveProperty('type')
      expect(collection).toHaveProperty('title')
      expect(collection).toHaveProperty('created')

      // list all the collections, asking for only two fields
      const filteredCollections = await api.collections.list(adminToken, { fields: ['type', 'title'] })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(filteredCollections).toHaveLength(1)

      const filteredCollection = filteredCollections[0]
      expect(filteredCollection).toHaveProperty('id') // the ID field must always be present
      expect(filteredCollection).toHaveProperty('type')
      expect(filteredCollection).toHaveProperty('title')
      expect(filteredCollection).not.toHaveProperty('created')
    })

    it('should allow an admin user to update a collection (without filtering properties)', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // update the collection
      const title = 'Updated title'
      const filtered = 'example'

      const result = await api.collections.update(collection.id, { title, filtered, rev: collection.rev }, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(result.title).toEqual(title)
      expect(result.filtered).toEqual('example')
    })

    it('should return conflict error if collection has changed before update', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const otherUserUpdate = { title: 'Causes conflict', filtered: 'example' }
      const Collection = require('../src/models/Collection.js')
      const collectionHandle = new Collection(Object.assign({}, collection, otherUserUpdate))
      collectionHandle.save()

      const myUpdate = { title: 'Outdated revision', filtered: 'example', rev: collection.rev }

      await api.collections.update(collection.id, myUpdate, adminToken)
        .expect(STATUS.CONFLICT)
    })

    it('should return bad request if rev property is not provided with an update', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const myUpdate = { title: 'Untagged revision', filtered: 'example' }

      await api.collections.update(collection.id, myUpdate, adminToken)
        .expect(STATUS.BAD_REQUEST)
    })

    it('should allow an admin user to update a collection with some fragments', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create some fragments
      await api.collections.createFragment(collection.id, fixtures.fragment, adminToken)
      await api.collections.createFragment(collection.id, fixtures.updatedFragment, adminToken)

      const result = await api.collections.retrieve(collection.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(result.fragments).toHaveLength(2)
    })

    it('should allow an admin user to delete a collection', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // delete the collection
      await api.collections.delete(collection.id, adminToken)
        .expect(STATUS.OK)

      // try to retrieve the deleted collection
      await api.collections.retrieve(collection.id, adminToken)
        .expect(STATUS.NOT_FOUND)
    })

    it('should allow an admin user to list fragments in a collection', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // list fragments in this collection
      const fragments = await api.collections.listFragments(collection.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(fragments).toHaveLength(0)
    })

    it('fragment.owners should be returned augmented with usernames (both plural and singular endpoints)', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a fragment in the collection
      const fragment = await api.collections.createFragment(collection.id, fixtures.fragment, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // retrieve the created fragment
      const retrievedFragment = await api.collections.retrieveFragment(collection.id, fragment.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(retrievedFragment.owners[0]).toHaveProperty('username', fixtures.adminUser.username)

      // list the created fragments
      const fragments = await api.collections.listFragments(collection.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(fragments[0].owners[0]).toHaveProperty('username', fixtures.adminUser.username)
    })

    it('should allow an admin user to create a fragment in a collection', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a fragment in the collection
      const fragment = await api.collections.createFragment(collection.id, fixtures.fragment, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // retrieve the created fragment
      const retrievedFragment = await api.collections.retrieveFragment(collection.id, fragment.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(retrievedFragment.presentation).toEqual(fixtures.fragment.presentation)
    })

    it('should allow an admin user to update a fragment in a collection', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a fragment in the collection
      const fragment = await api.collections.createFragment(collection.id, fixtures.fragment, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const source = '<blog>test</blog>'

      // update the fragment
      await api.collections.updateFragment(collection.id, fragment.id, { source, rev: fragment.rev }, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      // retrieve the updated fragment
      const retrievedFragment = await api.collections.retrieveFragment(collection.id, fragment.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(retrievedFragment.source).toEqual(source)
    })

    it('should allow an admin user to delete a fragment in a collection', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a fragment in the collection
      const fragment = await api.collections.createFragment(collection.id, fixtures.fragment, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create another fragment
      await api.collections.createFragment(collection.id, fixtures.fragment, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // delete the first fragment
      await api.collections.deleteFragment(collection.id, fragment.id, adminToken)
        .expect(STATUS.OK)

      // retrieve the updated fragment
      await api.collections.retrieveFragment(collection.id, fragment.id, adminToken)
        .expect(STATUS.NOT_FOUND)

      // list fragments in this collection
      const fragments = await api.collections.listFragments(collection.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(fragments).toHaveLength(1)
    })

    it('should allow an admin user to retrieve only some fields when listing fragments in a collection', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a fragment in the collection
      await api.collections.createFragment(collection.id, fixtures.fragment, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // list fragments in this collection
      const fragments = await api.collections.listFragments(collection.id, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(fragments).toHaveLength(1)

      const fragment = fragments[0]

      expect(fragment).toHaveProperty('id') // the ID field must always be present
      expect(fragment).toHaveProperty('type')
      expect(fragment).toHaveProperty('presentation')
      expect(fragment).toHaveProperty('source')

      // list fragments in this collection, requesting only certain fields
      const filteredFragments = await api.collections.listFragments(collection.id, adminToken, { fields: ['type', 'presentation'] })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(filteredFragments).toHaveLength(1)

      const filteredFragment = filteredFragments[0]

      expect(filteredFragment).toHaveProperty('id') // the ID field must always be present
      expect(filteredFragment).toHaveProperty('type')
      expect(filteredFragment).toHaveProperty('presentation')
      expect(filteredFragment).not.toHaveProperty('source')
    })

    it('should allow admin to retrieve teams for a fragment', async () => {
      const token = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a fragment in the collection
      const fragment = await api.collections.createFragment(collection.id, fixtures.fragment, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create the teams
      await api.teams.post(fixtures.readerTeam, token)
      const teamFixture = Object.assign({}, fixtures.contributorTeam, {object: {type: 'fragment', id: fragment.id}})
      await api.teams.post(teamFixture, token)

      // retrieve the fragment team(s)
      const teams = await api.collections.listFragmentTeams(collection.id, fragment.id, token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(teams).toHaveLength(1)
      expect(teams[0]).toMatchObject({
        name: 'My contributors',
        object: {
          type: 'fragment'
        }
      })
    })
  })

  describe('anonymous', () => {
    it('should not allow an anonymous user to create a collection', async () => {
      await api.collections.create(fixtures.collection)
        .expect(STATUS.UNAUTHORIZED)
    })

    it('should not allow an anonymous user to create a fragment', async () => {
      await api.collections.createFragment(fixtures.collection, fixtures.fragment)
        .expect(STATUS.UNAUTHORIZED)
    })
  })

  describe('user', () => {
    it('should allow a user to list all of the collections', async () => {
      const token = await authenticateUser()

      await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)

      const collections = await api.collections.list(token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections).toHaveLength(1)
    })

    it('should allow a user to create a collection', async () => {
      const token = await authenticateUser()

      // create the collection
      await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
    })

    it('should allow a user to retrieve a collection', async () => {
      const token = await authenticateUser()

      // create the collection
      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // retrieve the collection
      await api.collections.retrieve(collection.id, token)
        .expect(STATUS.OK)
    })

    it('should allow a user to retrieve teams for a collection', async () => {
      const token = await authenticateUser()

      // create the collection
      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create the teams
      const teamFixture = Object.assign({}, fixtures.contributorTeam, {object: {type: 'collection', id: collection.id}})
      await api.teams.post(teamFixture, token)
      await api.teams.post(fixtures.readerTeam, token)

      // retrieve the collection team(s)
      const teams = await api.collections.listTeams(collection.id, token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(teams).toHaveLength(1)
      expect(teams[0]).toMatchObject({
        name: 'My contributors',
        object: {
          type: 'collection'
        }
      })
    })

    it('should allow a user to update a collection they own', async () => {
      const token = await authenticateUser()

      // create the collection
      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // update the collection
      const title = 'Updated title'

      const result = await api.collections.update(collection.id, { title, rev: collection.rev }, token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(result.title).toEqual(title)
    })

    it('should not allow a user to update a collection they do not own', async () => {
      const userToken = await authenticateUser()
      const adminToken = await authenticateAdmin()

      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const title = 'Updated title'

      await api.collections.update(collection.id, { title, rev: collection.rev }, userToken)
        .expect(STATUS.FORBIDDEN)
    })

    it('should allow a user to delete any collection they own', async () => {
      const token = await authenticateUser()

      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      expect(collection.title).toEqual(fixtures.collection.title)

      await api.collections.delete(collection.id, token)
        .expect(STATUS.OK)

      await api.collections.retrieve(collection.id, token)
        .expect(STATUS.NOT_FOUND)
    })

    it('should not allow a user to delete a collection they do not own', async () => {
      const userToken = await authenticateUser()
      const adminToken = await authenticateAdmin()

      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      await api.collections.delete(collection.id, userToken)
        .expect(STATUS.FORBIDDEN)
    })

    it('should filter collection properties based on authorization on creation', async () => {
      const token = await authenticateUser()

      let collection = await api.collections.create(
        Object.assign({}, fixtures.collection, { filtered: 'example' }), token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      collection = await api.collections.retrieve(collection.id, token).expect(STATUS.OK)

      expect(Object.keys(collection)).not.toContain('filtered')
    })

    it('should return empty array if trying to filter with query params on properties for which user lacks authorization', async () => {
      const token = await authenticateUser()

      await api.collections.create(
        Object.assign({}, fixtures.collection, { filtered: 'example' }), token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const collections = await api.collections.list(token, { filtered: 'example' })
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collections).toHaveLength(0)
    })

    it('should filter collection properties based on authorization on update', async () => {
      const token = await authenticateUser()

      let collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const filtered = 'example'

      collection = await api.collections.update(collection.id, { filtered, rev: collection.rev }, token)
        .expect(STATUS.OK)
        .then(res => res.body)

      // collection = await api.collections.retrieve(collection.id, token).expect(STATUS.OK)

      expect(Object.keys(collection)).not.toContain('filtered')
    })

    it('should delete teams associated with a collection when the collection is deleted', async () => {
      // NOTE: need to authenticate as admin to be able to retrieve teams
      const token = await authenticateAdmin()

      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const teamData = {
        name: 'bar',
        teamType: {
          name: 'Test',
          permissions: 'read'
        },
        object: {
          type: 'collection',
          id: collection.id
        }
      }

      await api.teams.post(teamData, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a different team on a different collection

      const otherCollection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const otherTeamData = {
        name: 'foo',
        teamType: {
          name: 'Foo',
          permissions: 'read'
        },
        object: {
          type: 'collection',
          id: otherCollection.id
        }
      }

      await api.teams.post(otherTeamData, token)
        .expect(STATUS.CREATED)

      const collectionTeams = await api.collections.listTeams(collection.id, token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(collectionTeams).toHaveLength(1)

      const teamsBeforeDeletion = await api.teams.list(token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(teamsBeforeDeletion).toHaveLength(2)

      await api.collections.delete(collection.id, token)
        .expect(STATUS.OK)

      await api.collections.retrieve(collection.id, token)
        .expect(STATUS.NOT_FOUND)

      // await api.collections.listTeams(collection.id, token)
      //   .expect(STATUS.NOT_FOUND)

      const teamsAfterDeletion = await api.teams.list(token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(teamsAfterDeletion).toHaveLength(1)
    })

    it('should delete teams associated with a fragment when the fragment is deleted', async () => {
      // NOTE: need to authenticate as admin to be able to retrieve teams
      const token = await authenticateAdmin()

      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const fragment = await api.fragments.post(fixtures.fragment, collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const teamData = {
        name: 'bar',
        teamType: {
          name: 'Test',
          permissions: 'read'
        },
        object: {
          type: 'fragment',
          id: fragment.id
        }
      }

      await api.teams.post(teamData, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // create a different team on a different fragment

      const otherFragment = await api.fragments.post(fixtures.fragment, collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      const otherTeamData = {
        name: 'foo',
        teamType: {
          name: 'Foo',
          permissions: 'read'
        },
        object: {
          type: 'fragment',
          id: otherFragment.id
        }
      }

      await api.teams.post(otherTeamData, token)
        .expect(STATUS.CREATED)

      const fragmentTeams = await api.collections.listFragmentTeams(collection.id, fragment.id, token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(fragmentTeams).toHaveLength(1)

      const teamsBeforeDeletion = await api.teams.list(token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(teamsBeforeDeletion).toHaveLength(2)

      await api.collections.deleteFragment(collection.id, fragment.id, token)
        .expect(STATUS.OK)

      await api.collections.retrieveFragment(collection.id, fragment.id, token)
        .expect(STATUS.NOT_FOUND)

      // await api.collections.listFragmentTeams(collection.id, fragment.id, token)
      //   .expect(STATUS.NOT_FOUND)

      const teamsAfterDeletion = await api.teams.list(token)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(teamsAfterDeletion).toHaveLength(1)
    })
  })
})
