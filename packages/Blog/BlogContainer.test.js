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
global.window.localStorage = {
  getItem: jest.fn(() => 'tok123')
}

const BlogContainer = require('./BlogContainer').default

describe('<BlogContainer/>', () => {
  const createMockStore = configureStore([thunk])

  const makeWrapper = (props = {}) => shallow(<BlogContainer {...props}/>)

  it('allows empty collections', () => {
    const store = createMockStore({
      collections: []
    })
    makeWrapper({store})
  })

  it('selects fragments as posts', () => {
    let blog = {title: 'hello', fragments: [0, 2]}
    const store = createMockStore({
      collections: [blog],
      fragments: ['f1', 'f2', 'f3']
    })
    const wrapper = makeWrapper({store})
    expect(wrapper.props()).toMatchObject({
      blog,
      posts: ['f1', 'f3']
    })
  })
})
