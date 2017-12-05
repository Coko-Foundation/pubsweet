const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/collections').default

const T = require('../../src/actions/types')

describe('collections reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.collections).toBe(reducer)
  })

  const mockCollection = { id: '123' }
  const mockFragment = { name: 'mock fragment', id: '1234' }
  const mockCollectionWithFragment = {
    ...mockCollection,
    fragments: [mockFragment.id],
  }

  it('getCollections success', () => {
    const actual = reducer([mockCollection], {
      type: T.GET_COLLECTIONS_SUCCESS,
      collections: [mockCollection],
    })
    expect(actual).toEqual([mockCollection])
  })

  it('getCollections failure', () => {
    const actual = reducer(undefined, {
      type: T.GET_COLLECTIONS_FAILURE,
    })
    expect(actual).toEqual([])
  })

  it('getCollection request', () => {
    const actual = reducer([mockCollection], {
      type: T.GET_COLLECTION_REQUEST,
      collection: mockCollection,
    })
    expect(actual).toEqual([])
  })

  it('getCollection success adds collection to store', () => {
    const actual = reducer([], {
      type: T.GET_COLLECTION_SUCCESS,
      collection: mockCollection,
    })
    expect(actual).toEqual([mockCollection])
  })

  it('getCollection success updates collection in store', () => {
    const actual = reducer([mockCollection], {
      type: T.GET_COLLECTION_SUCCESS,
      collection: mockCollectionWithFragment,
    })
    expect(actual).toEqual([mockCollectionWithFragment])
  })

  it('createCollection success', () => {
    const actual = reducer(['dummy'], {
      type: T.CREATE_COLLECTION_SUCCESS,
      collection: mockCollection,
    })
    expect(actual).toEqual(['dummy', mockCollection])
  })

  it('createCollection success ignores duplicate', () => {
    const actual = reducer([mockCollection], {
      type: T.CREATE_COLLECTION_SUCCESS,
      collection: { ...mockCollection, same: 'but different' },
    })
    expect(actual).toEqual([mockCollection])
  })

  it('updateCollection success', () => {
    const actual = reducer(['dummy', mockCollection], {
      type: T.UPDATE_COLLECTION_SUCCESS,
      collection: mockCollection,
      update: {
        some: 'value',
      },
    })
    expect(actual).toEqual(['dummy', { ...mockCollection, some: 'value' }])
  })

  it('addFragments success', () => {
    const actual = reducer([mockCollection], {
      type: T.CREATE_FRAGMENT_SUCCESS,
      collection: mockCollection,
      fragment: mockFragment,
    })
    expect(actual).toEqual([mockCollectionWithFragment])
  })

  it('removeFragments success', () => {
    const actual = reducer([mockCollectionWithFragment], {
      type: T.DELETE_FRAGMENT_SUCCESS,
      collection: mockCollectionWithFragment,
      fragment: mockFragment,
    })
    expect(actual).toEqual([mockCollectionWithFragment])
  })

  it('logout success', () => {
    const actual = reducer([mockCollectionWithFragment], {
      type: T.LOGOUT_SUCCESS,
    })
    expect(actual).toEqual([])
  })

  it('returns same state for unrecognised action', () => {
    const state = []
    const actual = reducer(state, {
      type: 'something else',
    })
    expect(actual).toBe(state)
  })
})
