import React from 'react'
import { shallow } from 'enzyme'
import EventSourceMock, { sources } from 'eventsourcemock'

import { UpdateSubscriber } from '../../src/components/UpdateSubscriber'

global.PUBSWEET_COMPONENTS = []

function makeWrapper (props = {}) {
  const wrapper = shallow(<UpdateSubscriber
    currentUser={{}}
    handleUpdate={jest.fn()}
    {...props} />)
  // did* lifecycle methods don't get automatically called on shallow render
  wrapper.instance().componentDidMount()
  return wrapper
}

describe('<UpdateSubscriber/>', () => {
  beforeAll(() => {
    global.window.localStorage = {
      getItem: jest.fn(() => 'tok')
    }
    global.window.EventSource = EventSourceMock
  })

  it('is disconnected by default', () => {
    const wrapper = makeWrapper()

    expect(wrapper.html()).toContain('color:gray')
  })

  it('is connected after open event', () => {
    const wrapper = makeWrapper()
    sources['/updates?access_token=tok'].emit('open')

    expect(wrapper.html()).toContain('color:green')
  })

  it('is disconnected after error event', () => {
    const wrapper = makeWrapper()

    sources['/updates?access_token=tok'].emit('open')
    expect(wrapper.html()).toContain('color:green')

    sources['/updates?access_token=tok'].readyState = 0
    sources['/updates?access_token=tok'].emit('error')
    wrapper.update()
    expect(wrapper.html()).toContain('color:gray')
  })

  it('is disconnected after close event', () => {
    const wrapper = makeWrapper()

    sources['/updates?access_token=tok'].emit('open')
    expect(wrapper.html()).toContain('color:green')

    sources['/updates?access_token=tok'].emit('close')
    wrapper.update()
    expect(wrapper.html()).toContain('color:gray')
  })

  it('calls handleUpdate on message event', () => {
    const handleUpdate = jest.fn()
    makeWrapper({ handleUpdate })

    sources['/updates?access_token=tok'].emit('message', {
      origin: 'null',
      data: '{"action":"collection:create", "data":{"stuff":42}}'
    })
    expect(handleUpdate).toHaveBeenCalledWith('CREATE_COLLECTION_SUCCESS', {stuff: 42})
  })

  // TODO enable this test once PR is merged
  // https://github.com/gcedo/eventsourcemock/pull/1
  it.skip('unregisters listeners on unmount', () => {
    const handleUpdate = jest.fn()
    const wrapper = makeWrapper({ handleUpdate })
    wrapper.instance().componentWillUnmount()

    sources['/updates?access_token=tok'].emit('message', {
      origin: 'null',
      data: '{}'
    })
    expect(handleUpdate).not.toHaveBeenCalled()
  })

  it('connects on prop change once user is provided', () => {
    const wrapper = makeWrapper({ currentUser: null })

    sources['/updates?access_token=tok'].emit('open')
    expect(wrapper.html()).toContain('color:gray')

    wrapper.setProps({currentUser: {}}).update()
    sources['/updates?access_token=tok'].emit('open')
    expect(wrapper.html()).toContain('color:green')
  })

  it('reconnects after timeout if no pulse', () => {
    jest.useFakeTimers()

    const wrapper = makeWrapper()
    sources['/updates?access_token=tok'].emit('open')

    const instance = wrapper.instance()
    jest.spyOn(instance, 'subscribe')

    sources['/updates?access_token=tok'].emit('pulse')
    jest.runTimersToTime(20000)
    expect(instance.subscribe).not.toHaveBeenCalled()

    sources['/updates?access_token=tok'].emit('pulse')
    jest.runTimersToTime(20000)
    expect(instance.subscribe).not.toHaveBeenCalled()

    jest.runTimersToTime(20000)
    expect(instance.subscribe).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
