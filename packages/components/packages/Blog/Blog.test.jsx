import { shallow } from 'enzyme'
import React from 'react'

import Blog from './Blog'

describe('<Blog/>', () => {
  const makeWrapper = (props = {}) =>
    shallow(
      <Blog
        actions={{
          getCollections: jest.fn(() => Promise.resolve({ collections: [] })),
          getFragments: jest.fn(),
        }}
        blog={{}}
        posts={[]}
        {...props}
      />,
    )

  it('shows blog title', () => {
    const wrapper = makeWrapper({ blog: { title: 'Foo bar weekly' } })
    expect(wrapper.html()).toContain('Foo bar weekly')
  })

  it('shows no posts message', () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toContain('No blogpost has been published')
  })

  it('shows summary for each published post', () => {
    const wrapper = makeWrapper({
      posts: [
        { id: 1, published: true },
        { id: 2, published: true },
        { id: 3, published: false },
      ],
    })
    expect(wrapper.find('Summary')).toHaveLength(2)
  })
})
