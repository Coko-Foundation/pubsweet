const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/fragments').default
const describeReducer = require.requireActual('../helpers/describeReducer')(reducer)

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

  describeReducer('getOne request', {
    state: mockstate,
    action: {
      type: T.GET_FRAGMENT_REQUEST,
      collection: colwithfrag,
      fragment: mockfragmod
    },
    output: {}
  })

  describeReducer('getOne success', {
    state: {},
    action: {
      type: T.GET_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfragmod
    },
    output: mockstatemod
  })

  describeReducer('updateOne success', {
    state: mockstate,
    action: {
      type: T.UPDATE_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfragmod
    },
    output: mockstatemod
  })

  describeReducer('removeOne success', {
    state: mockstate,
    action: {
      type: T.DELETE_FRAGMENT_SUCCESS,
      collection: colwithfrag,
      fragment: mockfrag
    },
    output: {}
  })

  describeReducer('replaceAll success', {
    state: mockstate,
    action: {
      type: T.GET_FRAGMENTS_SUCCESS,
      collection: colwithfrag,
      fragments: [mockfragmod]
    },
    output: mockstatemod
  })

  describeReducer('logout success', {
    state: mockstate,
    action: {
      type: LOGOUT_SUCCESS
    },
    output: {}
  })
})
