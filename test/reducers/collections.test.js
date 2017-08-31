const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/collections').default
const describeReducer = require.requireActual('../helpers/describeReducer')(reducer)

const T = require('../../src/actions/types')
const { LOGOUT_SUCCESS } = require('pubsweet-component-login/types')

const clone = require('lodash/clone')

describe('collections reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.collections).to.equal(reducer)
  })

  const mockcol = { id: '123' }
  const mockfrag = { name: 'mock fragment', id: '1234' }
  const colwithfrag = clone(mockcol)
  colwithfrag.fragments = [mockfrag.id]

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

  describeReducer('getCollection request', {
    state: [mockcol],
    action: {
      type: T.GET_COLLECTION_REQUEST,
      collection: mockcol
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
