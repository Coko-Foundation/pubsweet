const actions = require.requireActual('../../src/actions/collectionsFragments')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')
const auth = require('../helpers/auth')

module.exports = app => {
  const mockcol = () => app.collection

  const storedData = {
    fragment: {}
  }

  describeAction('getCollections', {
    types: {
      request: T.GET_COLLECTIONS_REQUEST,
      success: T.GET_COLLECTIONS_SUCCESS
    },
    properties: {
      success: ['collections']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('getFragments', {
    firstarg: mockcol,
    types: {
      request: T.GET_FRAGMENTS_REQUEST,
      success: T.GET_FRAGMENTS_SUCCESS
    },
    properties: {
      success: ['fragments']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('createFragment', {
    firstarg: mockcol,
    secondarg: {
      name: 'some name',
      body: 'some text'
    },
    types: {
      request: T.CREATE_FRAGMENT_REQUEST,
      success: T.CREATE_FRAGMENT_SUCCESS,
      failure: T.CREATE_FRAGMENT_FAILURE
    },
    properties: {
      success: ['collection', 'fragment'],
      failure: ['fragment', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    Object.assign(storedData.fragment, data[T.CREATE_FRAGMENT_SUCCESS].fragment)
    // optional: more functionality tests here
  })

  describeAction('updateFragment', {
    firstarg: mockcol,
    secondarg: () => {
      return {
        id: storedData.fragment.id,
        name: 'new name'
      }
    },
    types: {
      request: T.UPDATE_FRAGMENT_REQUEST,
      success: T.UPDATE_FRAGMENT_SUCCESS,
      failure: T.UPDATE_FRAGMENT_FAILURE
    },
    properties: {
      success: ['fragment', 'receivedAt'],
      failure: ['fragment', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('deleteFragment', {
    firstarg: mockcol,
    secondarg: () => storedData.fragment,
    types: {
      request: T.DELETE_FRAGMENT_REQUEST,
      success: T.DELETE_FRAGMENT_SUCCESS,
      failure: T.DELETE_FRAGMENT_FAILURE
    },
    properties: {
      request: ['fragment', 'update'],
      success: ['fragment', 'collection'],
      failure: ['fragment', 'error', 'update']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })
}
