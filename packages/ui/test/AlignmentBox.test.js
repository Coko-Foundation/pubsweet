import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

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

describe('AlignmentBox', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<AlignmentBox {...requiredProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('gets the correct props', () => {
    const wrapperMounted = mount(<AlignmentBox {...requiredProps} />)

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
    const tree = renderer.create(<AlignmentBox {...requiredProps} />).toJSON()
    expect(tree).toHaveStyleRule('background-color', 'transparent')
    expect(tree).toHaveStyleRule('border-top-width', '1px')
    expect(tree).toHaveStyleRule('border-right-width', '1px')
    expect(tree).toHaveStyleRule('border-bottom-width', '1px')
    expect(tree).toHaveStyleRule('border-left-width', '1px')
  })

  test('with given props has the correct classes', () => {
    const tree = renderer.create(<AlignmentBox {...props} />).toJSON()
    expect(tree).toHaveStyleRule('background-color', '#666')
    expect(tree).toHaveStyleRule('border-top-width', '0')
    expect(tree).toHaveStyleRule('border-right-width', '0')
    expect(tree).toHaveStyleRule('border-bottom-width', '0')
    expect(tree).toHaveStyleRule('border-left-width', '0')
  })

  test('on click the corresponding method is triggered', () => {
    const newWrapper = shallow(<AlignmentBox {...props} />)
    newWrapper.simulate('click')
    expect(newWrapper.props().onClick).toHaveBeenCalled()
  })
})
