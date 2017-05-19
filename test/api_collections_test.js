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

    it('should allow an admin user to create a collection', async () => {
      const adminToken = await authenticateAdmin()

      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      expect(collection.type).toEqual(fixtures.collection.type)
      expect(collection.title).toEqual(fixtures.collection.title)
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

    it('should allow an admin user to update a collection', async () => {
      const adminToken = await authenticateAdmin()

      // create a collection
      const collection = await api.collections.create(fixtures.collection, adminToken)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // update the collection
      const title = 'Updated title'

      const result = await api.collections.update(collection.id, { title }, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(result.title).toEqual(title)
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

      // update the collection
      const title = 'Updated title'

      const result = await api.collections.update(collection.id, { title }, adminToken)
        .expect(STATUS.OK)
        .then(res => res.body)

      expect(result.title).toEqual(title)
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
      await api.collections.updateFragment(collection.id, fragment.id, { source }, adminToken)
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
    it('should allow a user to list all the collections', async () => {
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

    it('should allow a user to update a collection they own', async () => {
      const token = await authenticateUser()

      // create the collection
      const collection = await api.collections.create(fixtures.collection, token)
        .expect(STATUS.CREATED)
        .then(res => res.body)

      // update the collection
      const title = 'Updated title'

      const result = await api.collections.update(collection.id, { title }, token)
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

      await api.collections.update(collection.id, { title }, userToken)
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
  })
})
