const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/collections').default

const T = require('../../src/actions/types')
const { LOGOUT_SUCCESS } = require('pubsweet-component-login/types')

const clone = require('lodash/clone')

describe('collections reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.collections).toBe(reducer)
  })

  const mockcol = { id: '123' }
  const mockfrag = { name: 'mock fragment', id: '1234' }
  const colwithfrag = clone(mockcol)
  colwithfrag.fragments = [mockfrag.id]

  it('getCollections success', () => {
    const actual = reducer([mockcol], {
      type: T.GET_COLLECTIONS_SUCCESS,
      collections: [mockcol]
    })
    expect(actual).toEqual([mockcol])
  })

  it('getCollections failure', () => {
    const actual = reducer(undefined, {
      type: T.GET_COLLECTIONS_FAILURE
    })
    expect(actual).toEqual([])
  })

  it('getCollection request', () => {
    const actual = reducer([mockcol], {
      type: T.GET_COLLECTION_REQUEST,
      collection: mockcol
    })
    expect(actual).toEqual([])
  })

  it('getCollection success', () => {
    const actual = reducer([], {
      type: T.GET_COLLECTION_SUCCESS,
      collection: mockcol
    })
    expect(actual).toEqual([mockcol])
  })

  it('addFragments success', () => {
    const actual = reducer([mockcol], {
      type: T.CREATE_FRAGMENT_SUCCESS,
      collection: mockcol,
      fragment: mockfrag
    })
    expect(actual).toEqual([colwithfrag])
  })

  it('removeFragments success', () => {
    const actual = reducer([colwithfrag], {
      type: T.DELETE_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfrag
    })
    expect(actual).toEqual([colwithfrag])
  })

  it('logout success', () => {
    const actual = reducer([colwithfrag], {
      type: LOGOUT_SUCCESS
    })
    expect(actual).toEqual([])
  })
})
