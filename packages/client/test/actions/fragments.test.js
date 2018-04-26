global.PUBSWEET_COMPONENTS = []

const actions = require('../../src/actions/fragments')
const describeAction = require('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

describe('fragments actions', () => {
  const mockcol = { id: '123' }
  const mockfragment = { id: '1234' }

  describeAction('getFragments', {
    firstarg: mockcol,
    types: {
      request: T.GET_FRAGMENTS_REQUEST,
      success: T.GET_FRAGMENTS_SUCCESS,
    },
    properties: {
      success: ['type', 'fragments', 'receivedAt', 'collection'],
    },
  })

  // get a list of collections, with the specified fields
  describeAction('getFragments', {
    firstarg: mockcol,
    secondarg: {
      fields: ['type', 'presentation'],
    },
    types: {
      request: T.GET_FRAGMENTS_REQUEST,
      success: T.GET_FRAGMENTS_SUCCESS,
      failure: T.GET_FRAGMENTS_FAILURE,
    },
    properties: {
      success: ['type', 'fragments', 'receivedAt', 'collection'],
    },
  })

  describeAction('createFragment', {
    // no collection routes to top level fragment endpoint
    firstarg: null,
    secondarg: {
      title: 'mock fragment',
      type: 'some_fragment',
      owners: [],
    },
    types: {
      request: T.CREATE_FRAGMENT_REQUEST,
      success: T.CREATE_FRAGMENT_SUCCESS,
      failure: T.CREATE_FRAGMENT_FAILURE,
    },
    properties: {
      success: ['type', 'collection', 'fragment'],
      failure: ['type', 'isFetching', 'fragment', 'error'],
    },
  })

  describeAction('getFragment', {
    firstarg: mockcol,
    secondarg: mockfragment,
    types: {
      request: T.GET_FRAGMENT_REQUEST,
      success: T.GET_FRAGMENT_SUCCESS,
      failure: T.GET_FRAGMENT_FAILURE,
    },
    properties: {
      request: ['type', 'fragment'],
      success: ['type', 'fragment', 'receivedAt'],
      failure: ['type', 'isFetching', 'fragment', 'error'],
    },
  })

  describeAction('updateFragment', {
    firstarg: mockcol,
    secondarg: {
      id: '1234',
      title: 'modded fragment',
      type: 'some_fragment',
      owners: [],
    },
    types: {
      request: T.UPDATE_FRAGMENT_REQUEST,
      success: T.UPDATE_FRAGMENT_SUCCESS,
      failure: T.UPDATE_FRAGMENT_FAILURE,
    },
    properties: {
      success: ['type', 'fragment', 'update', 'receivedAt'],
      failure: ['type', 'isFetching', 'fragment', 'error'],
    },
  })

  describeAction('deleteFragment', {
    firstarg: mockcol,
    secondarg: mockfragment,
    types: {
      request: T.DELETE_FRAGMENT_REQUEST,
      success: T.DELETE_FRAGMENT_SUCCESS,
      failure: T.DELETE_FRAGMENT_FAILURE,
    },
    properties: {
      request: ['type', 'fragment', 'update'],
      success: ['type', 'fragment', 'collection'],
      failure: ['type', 'fragment', 'error', 'update'],
    },
  })
})
