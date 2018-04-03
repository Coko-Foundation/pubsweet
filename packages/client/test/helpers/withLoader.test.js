import React from 'react'
import { mount } from 'enzyme'
import withLoader from '../../src/helpers/withLoader'

const MockComponent = () => null
const makeWrapper = ({ data = {}, ...props } = {}) => {
  const Loadable = withLoader()(MockComponent)
  return mount(<Loadable data={data} {...props} />)
}

describe('withLoader higher order component', () => {
  it('shows loading message', () => {
    const wrapper = makeWrapper({ data: { loading: true } })
    expect(wrapper.text()).toBe('Loading...')
  })

  it('shows error message', () => {
    const wrapper = makeWrapper({ data: { error: new Error('Problem!') } })
    expect(wrapper.text()).toBe('Problem!')
  })

  it('renders wrapped component', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).name()).toBe('MockComponent')
  })

  it('passes parent props to wrapped component', () => {
    const wrapper = makeWrapper({ other: 'prop' })
    expect(wrapper.childAt(0).props()).toEqual({ other: 'prop' })
  })
})
