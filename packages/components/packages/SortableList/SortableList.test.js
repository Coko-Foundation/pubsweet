/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { mount, shallow } from 'enzyme'
import { DragDropContext } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'

const SortableList = require('./SortableList').default
const { DecoratedItem } = require('./SortableList')

function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />
      }
    },
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
      listItem={ListItem}
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
    expect(wrapper.find(DecoratedItem)).toHaveLength(4)
  })

  it('renders items in a DragAndDrop context', () => {
    const wrapper = setup(SortableList)
    expect(wrapper.find(ListItem)).toHaveLength(4)
  })

  it('simulate move item', () => {
    const wrapper = setup(SortableList)
    const newItems = wrapper.instance().props.moveItem(items, 1, 2)
    expect(newItems).toEqual([
      { id: '1', name: 'John' },
      { id: '3', name: 'Bob' },
      { id: '2', name: 'George' },
      { id: '4', name: 'Richard' },
    ])
  })
})
