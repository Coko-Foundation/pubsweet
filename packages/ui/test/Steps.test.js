import React from 'react'
import { shallow } from 'enzyme'
import Steps from '../src/molecules/Steps'

describe('<Steps>', () => {
  it('Renders without children', () => {
    const wrapper = shallow(<Steps currentStep={0} />)
    expect(wrapper.children()).toHaveLength(0)
  })

  it('Renders all the steps', () => {
    const wrapper = shallow(
      <Steps currentStep={1}>
        <Steps.Step title="First step" />
        <Steps.Step title="Second step" />
        <Steps.Step title="Third step" />
      </Steps>,
    )
    const children = wrapper.children()
    expect(children).toHaveLength(3)
  })
})
