import React from 'react'
import { clone } from 'lodash'
import { shallow, render } from 'enzyme'
import 'jest-styled-components'
import renderer from 'react-test-renderer'

import StateItem from '../src/atoms/StateItem'

const myMock = jest.fn()
const props = {
  values: ['To Clean', 'Cleaning', 'Cleaned'],
  update: myMock,
  index: 1,
}

const wrapper = shallow(<StateItem {...props} />)
const wrapperRendered = render(<StateItem {...props} />)

describe('StateItem', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<StateItem {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with default props cursor should be pointer', () => {
    const tree = renderer.create(<StateItem {...props} />).toJSON()
    expect(tree).toHaveStyleRule('cursor', 'pointer')
  })

  test('with disabled prop cursor should be default', () => {
    const newProps = clone(props)
    newProps.disabled = true
    const tree = renderer.create(<StateItem {...newProps} />).toJSON()
    expect(tree).toHaveStyleRule('cursor', 'default')
  })

  test('should render the value Cleaning', () => {
    expect(wrapperRendered.text()).toEqual(props.values[props.index])
  })

  test('update method should be triggered upon click', () => {
    wrapper.simulate('click')
    expect(props.update).toHaveBeenCalled()
  })
})
