import React from 'react'
import { clone } from 'lodash'
import { shallow, render } from 'enzyme'
import renderer from 'react-test-renderer'

import StateItem from '../src/atoms/StateItem'

const myMock = jest.fn()
const props = {
  values: ['To Clean', 'Cleaning', 'Cleaned'],
  disabled: false,
  update: myMock,
  index: 1,
  name: 'clean',
}

const wrapper = shallow(<StateItem {...props} />)
const wrapperRendered = render(<StateItem {...props} />)

describe('StateItem', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<StateItem {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('it should be a span', () => {
    expect(wrapper.is('span')).toBeTruthy()
    expect(wrapper).toHaveLength(1)
  })

  test('with default props class disabled should not exist', () => {
    expect(wrapper.is('.disabled')).toBe(false)
  })

  test('State Item should be disabled', () => {
    const newProps = clone(props)
    newProps.disabled = true
    const newWrapper = shallow(<StateItem {...newProps} />)

    expect(newWrapper.is('.disabled')).toBe(true)
  })

  test('it should render the value Cleaning', () => {
    expect(wrapperRendered.text()).toEqual(props.values[props.index])
  })

  test('update is triggered', () => {
    wrapper.simulate('click')
    expect(wrapper.instance().props.update).toHaveBeenCalled()
  })
})
