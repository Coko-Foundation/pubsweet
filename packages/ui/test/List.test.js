import React from 'react'
import { shallow } from 'enzyme'

import { List } from '../src/molecules'

describe('<List>', () => {
  it('renders', () => {
    const wrapper = shallow(<List />)
    expect(wrapper).toMatchSnapshot()
  })

  it('displays all the items', () => {
    const items = [
      { id: 1, name: 'First name' },
      { id: 2, name: 'Second name' },
    ]
    const wrapper = shallow(<List items={items} />)
    expect(wrapper.children()).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })
})
