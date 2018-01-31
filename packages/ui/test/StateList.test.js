import React from 'react'
import { forIn } from 'lodash'
import { shallow } from 'enzyme'
import 'jest-styled-components'
import renderer from 'react-test-renderer'

import StateItem from '../src/atoms/StateItem'
import StateList from '../src/molecules/StateList'

const currentValues = {
  style: 0,
  edit: 0,
  clean: 0,
  review: 0,
}
const stateValues = {
  clean: ['To Clean', 'Cleaning', 'Cleaned'],
  edit: ['To Edit', 'Editing', 'Edited'],
  review: ['To Review', 'Reviewing', 'Reviewed'],
  style: ['To Style', 'Styling', 'Styled'],
}

const props = {
  currentValues,
  values: stateValues,
  update: () => null,
}
const wrapper = shallow(<StateList {...props} />)
const stateItems = wrapper.find(StateItem)

describe('StateList', () => {
  test('is rendered correctly', () => {
    const tree = renderer.create(<StateList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should contain four State Item children', () => {
    const itemsNumber = Object.keys(stateValues).length

    expect(stateItems.exists()).toEqual(true)
    expect(stateItems).toHaveLength(itemsNumber)
  })

  test('gets the correct props', () => {
    let i = 0
    const stateItemComp = stateItems.getElements()

    forIn(stateValues, (value, key) => {
      const stateItem = stateItemComp[i]
      const stateItemProps = stateItem.props

      expect(stateItemProps.disabled).toEqual(false)
      expect(stateItemProps.index).toEqual(props.currentValues[key])
      expect(stateItemProps.values).toEqual(props.values[key])

      i += 1
    })
  })
})
