/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { mount, shallow } from 'enzyme'
import TestBackend from 'react-dnd-test-backend'
import { DndProvider } from 'react-dnd'
import SortableList from '../src'
import { Item } from '../src/SortableList'

function wrapInTestContext(DecoratedComponent) {
  return props => (
    <DndProvider backend={TestBackend}>
      <DecoratedComponent {...props} />
    </DndProvider>
  )
}

const items = [
  { id: '1', name: 'John' },
  { id: '2', name: 'George' },
  { id: '3', name: 'Bob' },
  { id: '4', name: 'Richard' },
]
const ListItem = ({ name }) => <div>{name}</div>

function setup(TestedComponent, props) {
  const WrappedModule = wrapInTestContext(TestedComponent)
  return mount(
    <WrappedModule
      items={items}
      ListItem={ListItem}
      moveItem={SortableList.moveItem}
      {...props}
    />,
  )
}

describe('SortableList', () => {
  it('helpers - moves items', () => {
    const newItems = SortableList.moveItem(items, 1, 2)
    expect(newItems).toEqual([
      { id: '1', name: 'John' },
      { id: '3', name: 'Bob' },
      { id: '2', name: 'George' },
      { id: '4', name: 'Richard' },
    ])
  })

  it('renders all items', () => {
    const wrapper = shallow(<SortableList items={items} />)
    expect(wrapper.find(Item)).toHaveLength(4)
  })

  it('renders items in a DragAndDrop context', () => {
    const wrapper = setup(SortableList)
    expect(wrapper.find(ListItem)).toHaveLength(4)
  })

  it('simulate move item', () => {
    const wrapper = setup(SortableList)
    const newItems = wrapper.props().moveItem(items, 1, 2)
    expect(newItems).toEqual([
      { id: '1', name: 'John' },
      { id: '3', name: 'Bob' },
      { id: '2', name: 'George' },
      { id: '4', name: 'Richard' },
    ])
  })
})
