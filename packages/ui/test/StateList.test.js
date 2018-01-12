import React from 'react'
import { forIn } from 'lodash'
import { shallow } from 'enzyme'
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

const myMock = jest.fn()

const props = {
  currentValues,
  values: stateValues,
  update: myMock,
}
const wrapper = shallow(<StateList {...props} />)
const stateItems = wrapper.find(StateItem)

describe('StateItem', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<StateList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('it should contain four State Item children', () => {
    const itemsNumber = Object.keys(stateValues).length

    expect(wrapper.is('div')).toBeTruthy()
    expect(wrapper.children()).toHaveLength(itemsNumber)
    expect(stateItems).toHaveLength(itemsNumber)
  })

  test('State Item get the correct props', () => {
    let i = 0
    const stateItemComp = stateItems.getElements()

    forIn(stateValues, (value, key) => {
      const stateItem = stateItemComp[i]
      const stateItemProps = stateItem.props

      expect(stateItemProps.disabled).toEqual(false)
      expect(stateItemProps.index).toEqual(props.currentValues[key])
      expect(stateItemProps.name).toEqual(key)
      expect(stateItemProps.values).toEqual(props.values[key])

      i += 1
    })
  })
})
