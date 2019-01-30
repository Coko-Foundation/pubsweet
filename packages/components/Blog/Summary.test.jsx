import { shallow } from 'enzyme'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Summary from './Summary'

describe('<Summary/>', () => {
  const makeWrapper = (fragment = {}) =>
    shallow(
      <BrowserRouter>
        <Summary
          fragment={{
            id: 123,
            title: 'A foo post',
            published_at: '2017-01-02T12:34:56',
            owners: [{ username: 'Anne Author' }],
            ...fragment,
          }}
        />
      </BrowserRouter>,
    )

  it('shows fragment title', () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toContain('A foo post')
  })

  it('shows no summary message', () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toContain('No summary available')
  })

  it('shows published date', () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toContain('Mon Jan 02 2017')
  })

  it('shows author', () => {
    const wrapper = makeWrapper()
    expect(wrapper.html()).toContain('Anne Author')
  })

  it('looks for <abstract>', () => {
    const wrapper = makeWrapper({ source: 'no abstract' })
    const html = wrapper.html()
    expect(html).not.toContain('no abstract')
  })
})
