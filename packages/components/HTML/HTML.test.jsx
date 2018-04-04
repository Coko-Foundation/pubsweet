import { shallow } from 'enzyme'
import React from 'react'

import HTML from './HTML'

describe('<HTML/>', () => {
  const makeWrapper = (props = {}) =>
    shallow(
      <HTML
        actions={{
          getCollections: jest.fn(() => Promise.resolve({ collections: [] })),
          getFragment: jest.fn(),
        }}
        id="123"
        {...props}
      />,
    )

  it('shows message if no fragment', () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toContain('No fragment found')
  })

  it('shows fragment HTML', () => {
    const presentation = '<h1>Hey</h1>'
    const wrapper = makeWrapper({ fragment: { presentation } })
    expect(wrapper.html()).toContain(presentation)
  })
})
