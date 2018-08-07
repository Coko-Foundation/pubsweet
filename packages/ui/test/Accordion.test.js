import React from 'react'
import { shallow, mount } from 'enzyme'

import { Accordion } from '../src/molecules'

describe('<Accordion>', () => {
  it('renders without children', () => {
    const wrapper = shallow(<Accordion />)
    expect(wrapper.children()).toHaveLength(0)
    expect(wrapper).toMatchSnapshot()
  })

  it('toggles children', () => {
    const wrapper = mount(
      <Accordion>
        <span className="child">child 1</span>
        <span className="child">child 2</span>
        <span className="child">child 3</span>
      </Accordion>,
    )
    wrapper.find({ 'data-test-id': 'accordion-header' }).simulate('click')
    expect(wrapper.find('.child')).toHaveLength(3)

    wrapper.find({ 'data-test-id': 'accordion-header' }).simulate('click')
    expect(wrapper.find('.child')).toHaveLength(0)
  })
})
