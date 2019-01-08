const STATUS = require('http-status-codes')

const api = require('./helpers/api')
const createBasicCollection = require('./helpers/basic_collection')
const createFragment = require('./helpers/fragment')
const cleanDB = require('./helpers/db_cleaner')
const { Collection } = require('@pubsweet/models')

describe('unauthenticated/public api', () => {
  let fragment
  let unpublishedFragment
  let collection

  beforeEach(cleanDB)

  async function setNewFragment(opts) {
    const userAndCollection = await createBasicCollection()
    collection = userAndCollection.collection
    fragment = await createFragment(opts, collection)
    unpublishedFragment = await createFragment({}, collection)
  }

  describe('published fragment', () => {
    beforeEach(() => setNewFragment({ published: true }))

    it('can see a published fragment in a collection', () =>
      api.fragments
        .get({ collection })
        .expect(STATUS.OK)
        .then(res => expect(res.body[0].id).toEqual(fragment.id)))

    it('can only see the published fragment in a collection', () =>
      api.fragments
        .get({ collection })
        .expect(STATUS.OK)
        .then(res =>
          expect(res.body.map(f => f.id)).not.toContain(unpublishedFragment.id),
        ))

    it('can only see the filtered list of properties for a fragment', () =>
      api.collections
        .retrieveFragment(collection.id, fragment.id)
        .expect(STATUS.OK)
        .then(res =>
          expect(Object.keys(res.body).sort()).toEqual([
            'id',
            'owners',
            'presentation',
            'source',
            'title',
          ]),
        ))

    it('can only see the filtered list of properties for a collection', () =>
      api.collections
        .retrieve(collection.id)
        .expect(STATUS.OK)
        .then(res =>
          expect(Object.keys(res.body).sort()).toEqual([
            'id',
            'owners',
            'title',
          ]),
        ))
  })

  describe('unpublished fragment', () => {
    beforeEach(() => setNewFragment({ published: false }))

    it('can not list unpublished fragments in a protected collection', () =>
      api.fragments
        .get({ collection })
        .expect(STATUS.OK)
        .then(res => expect(res.body).toEqual([])))

    it('can not find a fragment in a protected collection', () =>
      api.fragments
        .get({ collection, fragmentId: fragment.id })
        .expect(STATUS.NOT_FOUND))
  })

  describe('collections filtering by object and properties', () => {
    let publicCollection
    let privateCollection

    beforeEach(async () => {
      publicCollection = new Collection({
        title: 'Public collection',
        published: true,
        nonPublicProperty: 'example',
      })

      await publicCollection.save()

      privateCollection = new Collection({
        title: 'Private collection',
      })
      await privateCollection.save()
    })

    it('can only see the filtered list of collections and only filtered properties in each collection', () =>
      api.collections
        .list()
        .expect(STATUS.OK)
        .then(res => {
          const collections = res.body
          expect(collections).toHaveLength(1)
          expect(Object.keys(collections[0]).sort()).toEqual([
            'id',
            'owners',
            'title',
          ])
        }))
  })
})
