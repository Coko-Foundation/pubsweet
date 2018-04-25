global.PUBSWEET_COMPONENTS = []

const actions = require('../../src/actions/collections')
const describeAction = require('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

describe('Collection actions', () => {
  describeAction('getCollections', {
    types: {
      request: T.GET_COLLECTIONS_REQUEST,
      success: T.GET_COLLECTIONS_SUCCESS,
      failure: T.GET_COLLECTIONS_FAILURE,
    },
    properties: {
      request: ['type'],
      success: ['type', 'collections', 'receivedAt'],
      failure: ['type', 'error'],
    },
  })

  describeAction('getCollectionTeams', {
    firstarg: { id: 123 },
    types: {
      request: T.GET_COLLECTION_TEAMS_REQUEST,
      success: T.GET_COLLECTION_TEAMS_SUCCESS,
      failure: T.GET_COLLECTION_TEAMS_FAILURE,
    },
    properties: {
      request: ['type'],
      success: ['type', 'teams', 'receivedAt'],
      failure: ['type', 'error'],
    },
  })

  describeAction('createCollection', {
    firstarg: {
      type: 'testing',
      title: 'this is a test collection',
    },
    types: {
      request: T.CREATE_COLLECTION_REQUEST,
      success: T.CREATE_COLLECTION_SUCCESS,
      failure: T.CREATE_COLLECTION_FAILURE,
    },
    properties: {
      request: ['type', 'collection'],
      success: ['type', 'collection'],
      failure: ['type', 'isFetching', 'collection', 'error'],
    },
  })

  describeAction('getCollection', {
    firstarg: { id: 123 },
    types: {
      request: T.GET_COLLECTION_REQUEST,
      success: T.GET_COLLECTION_SUCCESS,
      failure: T.GET_COLLECTION_FAILURE,
    },
    properties: {
      request: ['type', 'collection'],
      success: ['type', 'collection', 'receivedAt'],
      failure: ['type', 'isFetching', 'collection', 'error'],
    },
  })

  describeAction('updateCollection', {
    firstarg: { id: 123 },
    secondarg: {
      type: 'testing',
      title: 'this is an updated collection',
    },
    types: {
      request: T.UPDATE_COLLECTION_REQUEST,
      success: T.UPDATE_COLLECTION_SUCCESS,
      failure: T.UPDATE_COLLECTION_FAILURE,
    },
    properties: {
      request: ['type', 'collection'],
      success: ['type', 'collection', 'update', 'receivedAt'],
      failure: ['type', 'isFetching', 'collection', 'error'],
    },
  })

  describeAction('deleteCollection', {
    firstarg: { id: 123 },
    types: {
      request: T.DELETE_COLLECTION_REQUEST,
      success: T.DELETE_COLLECTION_SUCCESS,
      failure: T.DELETE_COLLECTION_FAILURE,
    },
    properties: {
      request: ['type', 'collection', 'update'],
      success: ['type', 'collection'],
      failure: ['type', 'collection', 'update', 'error'],
    },
  })
})
