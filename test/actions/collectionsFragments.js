const expect = require('chai').expect

const actions = require('../../src/actions/collectionsFragments')
const describeAction = require('../helpers/action')(actions)
const mockcol = {
  id: 'fake'
}

const mockfrag = {
  id: 'fake'
}

describe('collections and fragments', () => {
  describeAction('getCollections', action => {
    // TODO: functionality tests here
  })

  describeAction('getFragments', { firstarg: mockcol }, action => {
    // TODO: functionality tests here
  })

  describeAction('createFragment', {
    firstarg: mockcol, secondarg: mockfrag
  }, action => {
    // TODO: functionality tests here
  })

  describeAction('updateFragment', {
    firstarg: mockcol, secondarg: mockfrag
  }, action => {
    // TODO: functionality tests here
  })

  describeAction('deleteFragment', {
    firstarg: mockcol, secondarg: mockfrag
  }, action => {
    // TODO: functionality tests here
  })
})
