import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'

import AlignmentBoxWithLabel from '../src/molecules/AlignmentBoxWithLabel'
import AlignmentTool from '../src/molecules/AlignmentTool'

const requiredProps = {
  data: [
    {
      active: false,
      id: 'left',
      label: 'Left',
    },
    {
      active: false,
      id: 'right',
      label: 'right',
    },
  ],
  onClickAlignmentBox: () => null,
}

const wrapper = shallow(<AlignmentTool {...requiredProps} />)
const wrapperMounted = mount(<AlignmentTool {...requiredProps} />)
const alignmentBoxesWithLabel = wrapper.find(AlignmentBoxWithLabel)

describe('AlignmentTool', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<AlignmentTool {...requiredProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should contain two Alignment Boxes with label', () => {
    expect(alignmentBoxesWithLabel.exists()).toEqual(true)
    expect(alignmentBoxesWithLabel).toHaveLength(2)
  })

  test('gets the correct props', () => {
    expect(wrapperMounted.prop('data')).toEqual(requiredProps.data)
    expect(wrapperMounted.prop('onClickAlignmentBox')).toEqual(
      requiredProps.onClickAlignmentBox,
    )
  })
})
