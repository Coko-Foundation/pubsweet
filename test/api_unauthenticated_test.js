const STATUS = require('http-status-codes')

var api = require('./helpers/api')
const createBasicCollection = require('./helpers/basic_collection')
const createFragment = require('./helpers/fragment')
const cleanDB = require('./helpers/db_cleaner')

describe('unauthenticated/public api', () => {
  var fragment
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
  )

  describe('published fragment', () => {
    beforeEach(() => setNewFragment({ published: true }))

    it('can read a fragment in a protected collection' +
       ' if it is published', () => {
      return api.fragments.get(collection).expect(STATUS.OK).then(
        res => expect(res.body[0].id).toEqual(fragment.id)
      )
    })
  })

  describe('unpublished fragment', () => {
    beforeEach(() => setNewFragment({ published: false }))

    it('can not list unpublished fragments in a protected collection', () => {
      return api.fragments.get(collection).expect(STATUS.OK).then(
        res => expect(res.body).toEqual([])
      )
    })

    it('can not find a fragment in a protected collection', () => {
      return api.fragments.get(
        collection, null, fragment.id
      ).expect(STATUS.NOT_FOUND)
    })
  })
})
