const actions = require.requireActual('../../src/actions/collections')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  const mockcol = () => app.collection

  const storedData = {
    fragment: {}
  }

  describeAction('getCollections', {
    types: {
      request: T.GET_COLLECTIONS_REQUEST,
      success: T.GET_COLLECTIONS_SUCCESS
      // TODO: there's no failure mode right now because collections
      // can be listed without login - when we add more failure
      // modes than auth fail we should enable failure here
    },
    properties: {
      request: ['type'],
      success: ['type', 'collections', 'receivedAt'],
      failure: ['type', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  let newcol

  describeAction('createCollection', {
    firstarg: {
      type: 'testing',
      title: 'this is a test collection'
    },
    types: {
      request: T.CREATE_COLLECTION_REQUEST,
      success: T.CREATE_COLLECTION_SUCCESS,
      failure: T.CREATE_COLLECTION_FAILURE
    },
    properties: {
      request: ['type', 'collection'],
      success: ['type', 'collection'],
      failure: ['type', 'isFetching', 'collection', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    newcol = data.CREATE_COLLECTION_SUCCESS.collection
    // optional: more functionality tests here
  })

  // TODO: updateCollection

  describeAction('patchCollection', {
    firstarg: () => newcol,
    secondarg: {
      type: 'testing',
      title: 'this is a changed collection'
    },
    types: {
      request: T.PATCH_COLLECTION_REQUEST,
      success: T.PATCH_COLLECTION_SUCCESS,
      failure: T.PATCH_COLLECTION_FAILURE
    },
    properties: {
      request: ['type', 'collection'],
      success: ['type', 'collection'],
      failure: ['type', 'isFetching', 'collection', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    expect(
      data.CREATE_COLLECTION_SUCCESS.collection.title
    ).to.not.equal(newcol.title)
    // optional: more functionality tests here
  })

  describeAction('deleteCollection', {
    firstarg: () => newcol,
    types: {
      request: T.DELETE_COLLECTION_REQUEST,
      success: T.DELETE_COLLECTION_SUCCESS,
      failure: T.DELETE_COLLECTION_FAILURE
    },
    properties: {
      request: ['type', 'collection', 'update'],
      success: ['type', 'collection'],
      failure: ['type', 'collection', 'update', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })
}
