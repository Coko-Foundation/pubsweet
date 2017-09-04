const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/fragments').default

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

const clone = require('lodash/clone')

describe('fragments reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.fragments).to.equal(reducer)
  })

  const mockcol = {id: '123'}
  mockcol.fragments = []

  const mockfrag = {
    title: 'mock fragment',
    type: 'some_fragment',
    owners: []
  }
  const mockstate = {}
  mockstate[mockfrag.id] = mockfrag

  const mockfragmod = {
    title: 'modded fragment',
    type: 'some_fragment',
    owners: []
  }
  const mockstatemod = {}
  mockstatemod[mockfrag.id] = mockfragmod

  const colwithfrag = clone(mockcol)
  colwithfrag.fragments = [mockfrag]

  it('getOne request', () => {
    const actual = reducer(mockstate, {
      type: T.GET_FRAGMENT_REQUEST,
      collection: colwithfrag,
      fragment: mockfragmod
    })
    expect(actual).to.eql({})
  })

  it('getOne success', () => {
    const actual = reducer({}, {
      type: T.GET_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfragmod
    })
    expect(actual).to.eql(mockstatemod)
  })

  it('updateOne success', () => {
    const actual = reducer(mockstate, {
      type: T.UPDATE_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfragmod
    })
    expect(actual).to.eql(mockstatemod)
  })

  it('removeOne success', () => {
    const actual = reducer(mockstate, {
      type: T.DELETE_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfrag
    })
    expect(actual).to.eql({})
  })

  it('replaceAll success', () => {
    const actual = reducer(mockstate, {
      type: T.GET_FRAGMENTS_SUCCESS,
      collection: colwithfrag,
      fragments: [mockfragmod]
    })
    expect(actual).to.eql(mockstatemod)
  })

  it('logout success', () => {
    const actual = reducer(mockstate, {
      type: LOGOUT_SUCCESS
    })
    expect(actual).to.eql({})
  })
})
