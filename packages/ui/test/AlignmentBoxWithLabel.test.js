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

const wrapper = shallow(<AlignmentBoxWithLabel {...requiredProps} />)
const wrapperMounted = mount(<AlignmentBoxWithLabel {...requiredProps} />)

describe('AlignmentBoxWithLabel', () => {
  test('is rendered correctly', () => {
    const tree = renderer
      .create(<AlignmentBoxWithLabel {...requiredProps} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should contain one Alignment Box child', () => {
    expect(wrapper.find(AlignmentBox).exists()).toEqual(true)
  })

  test('gets the correct props', () => {
    const noBorderDefaults = {
      top: false,
      bottom: false,
      right: false,
      left: false,
    }

    expect(wrapperMounted.prop('active')).toEqual(requiredProps.active)
    expect(wrapperMounted.prop('id')).toEqual(requiredProps.id)
    expect(wrapperMounted.prop('labelText')).toEqual(requiredProps.labelText)
    expect(wrapperMounted.prop('noBorder')).toEqual(noBorderDefaults)
    expect(wrapperMounted.prop('labelPositionRight')).toEqual(false)
  })

  test(`with default props the label is rendered on the left`, () => {
    const label = wrapperMounted.find('span')
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
