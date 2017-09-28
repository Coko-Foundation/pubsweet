import {shallow} from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

jest.mock('config', () => ({
  'pubsweet-server': {
    API_ENDPOINT: ''
  }
}))
global.PUBSWEET_COMPONENTS = []

const HTMLContainer = require('./HTMLContainer').default

describe('<HTMLContainer/>', () => {
  const createMockStore = configureStore([thunk])

  const makeWrapper = (props = {}) => shallow(<HTMLContainer {...props}/>)

  it('selects a fragment', () => {
    const id = '123'
    let fragment = {title: 'Hello'}
    const store = createMockStore({
      fragments: {[id]: fragment}
    })

    const wrapper = makeWrapper({store, match: {params: {id}}})

    expect(wrapper.props()).toMatchObject({id, fragment})
  })
})
