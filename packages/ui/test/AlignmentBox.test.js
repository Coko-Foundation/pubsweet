import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

import AlignmentBox from '../src/atoms/AlignmentBox'

const myMock = jest.fn()
const props = {
  active: true,
  id: 'left',
  onClick: myMock,
  noBorder: {
    top: true,
    bottom: true,
    right: true,
    left: true,
  },
}

const requiredProps = {
  active: false,
  id: 'left',
}

const wrapper = shallow(<AlignmentBox {...requiredProps} />)
const wrapperMounted = mount(<AlignmentBox {...requiredProps} />)

describe('AlignmentBox', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<AlignmentBox {...requiredProps} />).toJSON()
    expect(tree).toMatchSnapshot()
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
    expect(wrapperMounted.prop('noBorder')).toEqual(noBorderDefaults)
  })

  test('with default props has borders and has not active indicator', () => {
    expect(wrapper.is('.active')).toBe(false)
    expect(wrapper.is('.noBorderTop')).toBe(false)
    expect(wrapper.is('.noBorderRight')).toBe(false)
    expect(wrapper.is('.noBorderBottom')).toBe(false)
    expect(wrapper.is('.noBorderLeft')).toBe(false)
  })

  test('with given props has the correct classes', () => {
    const newWrapper = shallow(<AlignmentBox {...props} />)

    expect(newWrapper.is('.active')).toBe(true)
    expect(newWrapper.is('.noBorderTop')).toBe(true)
    expect(newWrapper.is('.noBorderRight')).toBe(true)
    expect(newWrapper.is('.noBorderBottom')).toBe(true)
    expect(newWrapper.is('.noBorderLeft')).toBe(true)
  })

  test('on click the corresponding method is triggered', () => {
    const newWrapper = shallow(<AlignmentBox {...props} />)
    newWrapper.simulate('click')
    expect(newWrapper.instance().props.onClick).toHaveBeenCalled()
  })
})
