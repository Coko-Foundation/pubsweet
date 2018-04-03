import React from 'react'
import { mount } from 'enzyme'
import withMutationState from '../../src/helpers/withMutationState'

const MockComponent = () => null
const makeWrapper = (props = {}) => {
  const Component = withMutationState()(MockComponent)
  return mount(<Component {...props} />)
}

describe('withMutationState higher order component', () => {
  it('sets loading prop', async () => {
    const wrapper = makeWrapper({
      mutate: () => Promise.resolve({ status: 'OK' }),
    })

    // trigger mutation
    const loading = wrapper
      .childAt(0)
      .props()
      .mutate()
    wrapper.update()
    expect(wrapper.childAt(0).props()).toMatchObject({
      mutateLoading: true,
      mutateResult: null,
    })

    // await completion
    await loading
    wrapper.update()
    expect(wrapper.childAt(0).props()).toMatchObject({
      mutateLoading: false,
      mutateResult: { status: 'OK' },
    })
  })

  it('sets error prop', async () => {
    const wrapper = makeWrapper({
      mutate: () => Promise.reject(new Error('Problem!')),
    })

    // trigger mutation
    const loading = wrapper
      .childAt(0)
      .props()
      .mutate()
    wrapper.update()
    expect(wrapper.childAt(0).props()).toMatchObject({
      mutateLoading: true,
      mutateError: null,
    })

    // await completion
    await loading
    wrapper.update()
    expect(wrapper.childAt(0).props()).toMatchObject({
      mutateLoading: false,
      mutateError: 'Problem!',
    })
  })

  it('renders wrapped component', () => {
    const wrapper = makeWrapper()
    expect(wrapper.childAt(0).name()).toBe('MockComponent')
  })

  it('passes parent props to wrapped component', () => {
    const wrapper = makeWrapper({ other: 'prop' })
    expect(wrapper.childAt(0).props()).toMatchObject({ other: 'prop' })
  })
})
