import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import AlignmentBox from '../src/atoms/AlignmentBox'
import AlignmentBoxWithLabel from '../src/molecules/AlignmentBoxWithLabel'

const requiredProps = {
  active: false,
  id: 'left',
  labelText: 'Left',
}

describe('AlignmentBoxWithLabel', () => {
  test('is rendered correctly', () => {
    const tree = renderer
      .create(<AlignmentBoxWithLabel {...requiredProps} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should contain one Alignment Box child', () => {
    const wrapper = shallow(<AlignmentBoxWithLabel {...requiredProps} />)
    expect(wrapper.find(AlignmentBox).exists()).toEqual(true)
  })

  test('gets the correct props', () => {
    const wrapper = mount(<AlignmentBoxWithLabel {...requiredProps} />)

    const noBorderDefaults = {
      top: false,
      bottom: false,
      right: false,
      left: false,
    }

    expect(wrapper.prop('active')).toEqual(requiredProps.active)
    expect(wrapper.prop('id')).toEqual(requiredProps.id)
    expect(wrapper.prop('labelText')).toEqual(requiredProps.labelText)
    expect(wrapper.prop('noBorder')).toEqual(noBorderDefaults)
    expect(wrapper.prop('labelPositionRight')).toEqual(false)
  })

  test(`with default props the label is rendered on the left`, () => {
    const wrapper = mount(<AlignmentBoxWithLabel {...requiredProps} />)

    const label = wrapper.find('span')
    expect(label.text()).toEqual(requiredProps.labelText)
    expect(label).toHaveStyleRule('order', '0')
  })

  test('with labelPositionRight={true}, the label is rendered on the right', () => {
    const newWrapper = mount(
      <AlignmentBoxWithLabel labelPositionRight {...requiredProps} />,
    )
    const label = newWrapper.find('span')
    expect(label.text()).toEqual(requiredProps.labelText)
    expect(label).toHaveStyleRule('order', '2')
  })
})
