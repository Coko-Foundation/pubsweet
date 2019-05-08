import React from 'react'
import { shallow } from 'enzyme'
import TwoColumnLayout from './TwoColumnLayout'

describe('TwoColumnLayout', () => {
  const generateNumberOfElements = numberOfChildren => {
    const elementList = []
    for (let item = 0; item < numberOfChildren; item += 1) {
      elementList.push(<div key={item} />)
    }
    return elementList
  }
  const makeWrapperWithChildren = numberOfChildren =>
    shallow(
      <TwoColumnLayout>
        {generateNumberOfElements(numberOfChildren)}
      </TwoColumnLayout>,
    )
  it('returns no Box components when there are no children passed', () => {
    expect(makeWrapperWithChildren(0).find('Box')).toHaveLength(0)
  })
  it('returns one Box component when one child element is passed', () => {
    expect(makeWrapperWithChildren(1).find('Box')).toHaveLength(1)
  })
  it('returns many Box component when many childen are passed', () => {
    expect(makeWrapperWithChildren(10).find('Box')).toHaveLength(10)
  })
  it('uses index of child as a key when no keys passed', () => {
    expect(
      makeWrapperWithChildren(3)
        .find('div')
        .at(2)
        .key(),
    ).toEqual('2')
  })
  it('uses the assigned key of child when prop exists', () => {
    const wrapper = shallow(
      <TwoColumnLayout>
        <div key="foo" />
      </TwoColumnLayout>,
    )
    expect(wrapper.find('div').key()).toEqual('foo')
  })
  it('correctly sets mb prop of child Box components when passed bottomSpacing', () => {
    const wrapper = shallow(
      <TwoColumnLayout bottomSpacing>
        <div />
      </TwoColumnLayout>,
    )
    expect(wrapper.find('Box').prop('mb')).toEqual(3)
  })
  it('maps paddingX to the px prop of the child Box components', () => {
    const wrapper = shallow(
      <TwoColumnLayout paddingX={1}>
        <div />
      </TwoColumnLayout>,
    )
    expect(wrapper.find('Box').prop('px')).toEqual(1)
  })
  it('maps customWidth to the width prop of the child Box components', () => {
    const wrapper = shallow(
      <TwoColumnLayout customWidth="100px">
        <div />
      </TwoColumnLayout>,
    )
    expect(wrapper.find('Box').prop('width')).toEqual('100px')
  })
})
