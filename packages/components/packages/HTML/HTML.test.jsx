import {shallow} from 'enzyme'
import React from 'react'

import HTML from './HTML'

describe('<HTML/>', () => {
  const makeWrapper = (props = {}) => shallow(<HTML
      id='123'
      actions={{
        getCollections: jest.fn(() => Promise.resolve({collections: []})),
        getFragment: jest.fn()
      }}
      {...props}
  />)

  it('shows message if no fragment', () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toContain('No fragment found')
  })

  it('shows fragment HTML', () => {
    let presentation = '<h1>Hey</h1>'
    const wrapper = makeWrapper({fragment: {presentation}})
    expect(wrapper.html()).toContain(presentation)
  })
})
