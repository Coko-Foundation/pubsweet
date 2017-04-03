const reducers = require.requireActual('../../src/reducers/fragments')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')

const clone = require('lodash/clone')

module.exports = app => describeReducerSet('fragments', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers.default)

  const mockcol = app.collection
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
  mockstatemod = {}
  mockstatemod[mockfrag.id] = mockfragmod

  const colwithfrag = clone(mockcol)
  colwithfrag.fragments = [mockfrag]

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
})
