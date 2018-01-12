import React from 'react'
import { shallow, mount, render } from 'enzyme'
import renderer from 'react-test-renderer'

import AlignmentBox from '../src/atoms/AlignmentBox'
import AlignmentBoxWithLabel from '../src/molecules/AlignmentBoxWithLabel'

const props = {
  active: true,
  id: 'left',
  labelPositionRight: true,
  labelText: 'Left',
}

const requiredProps = {
  active: false,
  id: 'left',
  labelText: 'Left',
}

const wrapper = shallow(<AlignmentBoxWithLabel {...requiredProps} />)
const wrapperMounted = mount(<AlignmentBoxWithLabel {...requiredProps} />)
const wrapperRendered = render(<AlignmentBoxWithLabel {...requiredProps} />)

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
    expect(wrapper.is('.reverseOrder')).toBe(false)
    expect(wrapperRendered.text()).toEqual(requiredProps.labelText)
  })

  test('with given props has the correct classes', () => {
    const newWrapper = shallow(<AlignmentBoxWithLabel {...props} />)

    expect(newWrapper.is('.reverseOrder')).toBe(true)
  })
})
