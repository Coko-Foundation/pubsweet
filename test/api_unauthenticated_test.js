const STATUS = require('http-status-codes')

var api = require('./helpers/api')
const createBasicCollection = require('./helpers/basic_collection')
const createFragment = require('./helpers/fragment')
const cleanDB = require('./helpers/db_cleaner')
const Collection = require('../src/models/Collection')

describe('unauthenticated/public api', () => {
  var fragment
  var unpublishedFragment
  var collection

  afterEach(cleanDB)

  const setNewFragment = (opts) => cleanDB().then(
    createBasicCollection
  ).then(
    userAndCol => {
      collection = userAndCol.collection
      return createFragment(opts, collection)
    }
  ).then(
    newfragment => { fragment = newfragment }
  ).then(
    () => createFragment({}, collection)
  ).then(
    fragment => { unpublishedFragment = fragment }
  )

  describe('published fragment', () => {
    beforeEach(() => setNewFragment({ published: true }))

    it('can see a published fragment in a collection', () => {
      return api.fragments.get({ collection }).expect(STATUS.OK).then(
        res => expect(res.body[0].id).toEqual(fragment.id)
      )
    })

    it('can only see the published fragment in a collection', () => {
      return api.fragments.get({ collection }).expect(STATUS.OK).then(
        res => expect(res.body.map(f => f.id)).not.toContain(unpublishedFragment.id)
      )
    })

    it('can only see the filtered list of properties for a fragment', () => {
      return api.collections.retrieveFragment(collection.id, fragment.id).expect(STATUS.OK).then(
        res => expect(Object.keys(res.body)).toEqual(['id', 'title', 'source', 'presentation', 'owners'])
      )
    })

    it('can only see the filtered list of properties for a collection', () => {
      return api.collections.retrieve(collection.id).expect(STATUS.OK).then(
        res => expect(Object.keys(res.body)).toEqual(['id', 'title', 'owners'])
      )
    })
  })

  describe('unpublished fragment', () => {
    beforeEach(() => setNewFragment({ published: false }))

    it('can not list unpublished fragments in a protected collection', () => {
      return api.fragments.get({ collection }).expect(STATUS.OK).then(
        res => expect(res.body).toEqual([])
      )
    })

    it('can not find a fragment in a protected collection', () => {
      return api.fragments.get({ collection, fragmentId: fragment.id })
        .expect(STATUS.NOT_FOUND)
    })
  })

  describe('collections filtering by object and properties', () => {
    let publicCollection
    let privateCollection

    beforeEach(async () => {
      publicCollection = new Collection({
        title: 'Public collection',
        published: true,
        nonPublicProperty: 'example'
      })
      await publicCollection.save()

      privateCollection = new Collection({
        title: 'Private collection'
      })
      await privateCollection.save()
    })

    it('can only see the filtered list of collections and only filtered properties in each collection', () => {
      return api.collections.list().expect(STATUS.OK).then(
        res => {
          const collections = res.body
          expect(collections.length).toEqual(1)
          expect(Object.keys(collections[0])).toEqual(['id', 'title', 'owners'])
        }
      )
    })
  })
})
