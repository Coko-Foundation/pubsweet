const reducers = require.requireActual('../../src/reducers/collections')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')
const { LOGOUT_SUCCESS } = require('pubsweet-component-login/types')

const clone = require('lodash/clone')

module.exports = app => describeReducerSet('collections', reducers, () => {
  const mockcol = app.collection
  const mockfrag = { name: 'mock fragment', id: '1234' }
  const colwithfrag = clone(mockcol)
  colwithfrag.fragments = [mockfrag.id]

  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers.default)

  describeReducer('getCollections success', {
    state: [mockcol],
    action: {
      type: T.GET_COLLECTIONS_SUCCESS,
      collections: [mockcol]
    },
    output: [mockcol]
  })

  describeReducer('getCollections failure', {
    action: {
      type: T.GET_COLLECTIONS_FAILURE
    },
    output: []
  })

  describeReducer('getCollection success', {
    state: [],
    action: {
      type: T.GET_COLLECTION_SUCCESS,
      collection: mockcol
    },
    output: [mockcol]
  })

  describeReducer('addFragments success', {
    state: [mockcol],
    action: {
      type: T.CREATE_FRAGMENT_SUCCESS,
      collection: mockcol,
      fragment: mockfrag
    },
    output: [colwithfrag]
  })

  describeReducer('removeFragments success', {
    state: [colwithfrag],
    action: {
      type: T.DELETE_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfrag
    },
    output: [colwithfrag]
  })

  describeReducer('logout success', {
    state: [colwithfrag],
    action: {
      type: LOGOUT_SUCCESS
    },
    output: []
  })
})
