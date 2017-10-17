global.PUBSWEET_COMPONENTS = []

const actions = require('../../src/actions/collections')
const describeAction = require('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

describe('Collection actions', () => {
  describeAction('getCollections', {
    types: {
      request: T.GET_COLLECTIONS_REQUEST,
      success: T.GET_COLLECTIONS_SUCCESS,
      failure: T.GET_COLLECTIONS_FAILURE
    },
    properties: {
      request: ['type'],
      success: ['type', 'collections', 'receivedAt'],
      failure: ['type', 'error']
    }
  })

  // get a list of collections, with the specified fields
  describeAction('getCollections', {
    firstarg: {
      fields: ['type', 'title']
    },
    types: {
      request: T.GET_COLLECTIONS_REQUEST,
      success: T.GET_COLLECTIONS_SUCCESS
    },
    properties: {
      request: ['type'],
      success: ['type', 'collections', 'receivedAt'],
      failure: ['type', 'error']
    }
  }, (action, data) => {
    const filteredCollection = data.GET_COLLECTIONS_SUCCESS.collections[0]
    expect(filteredCollection).toHaveProperty('id')
    expect(filteredCollection).toHaveProperty('type')
    expect(filteredCollection).toHaveProperty('title')
    expect(filteredCollection).not.toHaveProperty('created')
  })

  describeAction('getCollectionTeams', {
    firstarg: {id: 123},
    types: {
      request: T.GET_COLLECTION_TEAMS_REQUEST,
      success: T.GET_COLLECTION_TEAMS_SUCCESS,
      failure: T.GET_COLLECTION_TEAMS_FAILURE
    },
    properties: {
      request: ['type'],
      success: ['type', 'teams', 'receivedAt'],
      failure: ['type', 'error']
    }
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
    }
  })

  describeAction('getCollection', {
    firstarg: newcol,
    types: {
      request: T.GET_COLLECTION_REQUEST,
      success: T.GET_COLLECTION_SUCCESS,
      failure: T.GET_COLLECTION_FAILURE
    },
    properties: {
      request: ['type', 'collection'],
      success: ['type', 'collection', 'receivedAt'],
      failure: ['type', 'isFetching', 'collection', 'error']
    }
  }, (action, data) => {
    const collection = data.GET_COLLECTION_SUCCESS.collection
    expect(collection).toHaveProperty('id')
  })

  describeAction('updateCollection', {
    firstarg: newcol,
    secondarg: {
      type: 'testing',
      title: 'this is an updated collection'
    },
    types: {
      request: T.UPDATE_COLLECTION_REQUEST,
      success: T.UPDATE_COLLECTION_SUCCESS,
      failure: T.UPDATE_COLLECTION_FAILURE
    },
    properties: {
      request: ['type', 'collection'],
      success: ['type', 'collection'],
      failure: ['type', 'isFetching', 'collection', 'error']
    }
  }, (action, data) => {
    expect(
      data.UPDATE_COLLECTION_SUCCESS.collection.title
    ).toBe('this is an updated collection')
  })

  // NOTE: enable this once PATCH method is implemented on the server
  // describeAction('patchCollection', {
  //   firstarg: newcol,
  //   secondarg: {
  //     type: 'testing',
  //     title: 'this is a patched collection'
  //   },
  //   types: {
  //     request: T.PATCH_COLLECTION_REQUEST,
  //     success: T.PATCH_COLLECTION_SUCCESS,
  //     failure: T.PATCH_COLLECTION_FAILURE
  //   },
  //   properties: {
  //     request: ['type', 'collection'],
  //     success: ['type', 'collection'],
  //     failure: ['type', 'isFetching', 'collection', 'error']
  //   }
  // }, (action, data) => {
  //   expect(
  //     data.PATCH_COLLECTION_SUCCESS.collection.title
  //   ).toBe('this is a patched collection')
  // })

  describeAction('deleteCollection', {
    firstarg: newcol,
    types: {
      request: T.DELETE_COLLECTION_REQUEST,
      success: T.DELETE_COLLECTION_SUCCESS,
      failure: T.DELETE_COLLECTION_FAILURE
    },
    properties: {
      request: ['type', 'collection', 'update'],
      success: ['type', 'collection'],
      failure: ['type', 'collection', 'update', 'error']
    }
  }, (action, data) => {
    expect(
      data.DELETE_COLLECTION_SUCCESS.collection.title
    ).toBe(newcol.collection.title)
  })
})
