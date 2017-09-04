global.PUBSWEET_COMPONENTS = []

const actions = require('../../src/actions/fragments')
const describeAction = require('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

describe('fragments actions', () => {
  const mockcol = {id: '123'}
  const mockfragment = {id: '1234'}

  describeAction('getFragments', {
    firstarg: mockcol,
    types: {
      request: T.GET_FRAGMENTS_REQUEST,
      success: T.GET_FRAGMENTS_SUCCESS
    },
    properties: {
      success: ['fragments']
    }
  })

  // get a list of collections, with the specified fields
  describeAction('getFragments', {
    firstarg: mockcol,
    secondarg: {
      fields: ['type', 'presentation']
    },
    types: {
      request: T.GET_FRAGMENTS_REQUEST,
      success: T.GET_FRAGMENTS_SUCCESS
    },
    properties: {
      success: ['fragments']
    }
  }, (action, data) => {
    const filteredFragment = data.GET_FRAGMENTS_SUCCESS.fragments[0]
    expect(filteredFragment).toHaveProperty('id')
    expect(filteredFragment).toHaveProperty('type')
    expect(filteredFragment).toHaveProperty('presentation')
    expect(filteredFragment).not.toHaveProperty('source')
  })

  describeAction('createFragment', {
    firstarg: mockcol,
    secondarg: {
      title: 'mock fragment',
      type: 'some_fragment',
      owners: []
    },
    types: {
      request: T.CREATE_FRAGMENT_REQUEST,
      success: T.CREATE_FRAGMENT_SUCCESS,
      failure: T.CREATE_FRAGMENT_FAILURE
    },
    properties: {
      success: ['collection', 'fragment'],
      failure: ['fragment', 'error']
    }
  })

  describeAction('getFragment', {
    firstarg: mockcol,
    secondarg: mockfragment,
    types: {
      request: T.GET_FRAGMENT_REQUEST,
      success: T.GET_FRAGMENT_SUCCESS,
      failure: T.GET_FRAGMENT_FAILURE
    },
    properties: {
      request: ['fragment'],
      success: ['fragment', 'receivedAt'],
      failure: ['isFetching', 'fragment', 'error']
    }
  })

  describeAction('updateFragment', {
    firstarg: mockcol,
    secondarg: {
      id: '1234',
      title: 'modded fragment',
      type: 'some_fragment',
      owners: []
    },
    types: {
      request: T.UPDATE_FRAGMENT_REQUEST,
      success: T.UPDATE_FRAGMENT_SUCCESS,
      failure: T.UPDATE_FRAGMENT_FAILURE
    },
    properties: {
      success: ['fragment', 'receivedAt'],
      failure: ['fragment', 'error']
    }
  })

  describeAction('deleteFragment', {
    firstarg: mockcol,
    secondarg: mockfragment,
    types: {
      request: T.DELETE_FRAGMENT_REQUEST,
      success: T.DELETE_FRAGMENT_SUCCESS,
      failure: T.DELETE_FRAGMENT_FAILURE
    },
    properties: {
      request: ['fragment', 'update'],
      success: ['fragment', 'collection'],
      failure: ['fragment', 'error', 'update']
    }
  })
})
