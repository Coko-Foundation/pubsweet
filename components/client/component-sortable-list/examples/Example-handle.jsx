/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Icon } from '@pubsweet/ui'
import SortableList from '../src'

const Row = styled.div`
  display: flex;
  align-items: center;
  height: calc(${th('gridUnit')} * 4);
  border: 1px ${th('colorPrimary')} solid;
  line-height: calc(${th('gridUnit')} * 2);
  padding: ${th('gridUnit')};
  margin-bottom: 1em;
  font-family: ${th('fontInterface')};
`

const Handle = styled.div`
  display: inline-block;
`
const DragHandle = ({ handleRef }) => (
  <Handle ref={handleRef}>
    <Icon>more-vertical</Icon>
  </Handle>
)

const ItemWithDragHandle = ({ previewRef, handle, isDragging, ...props }) => (
  <Row ref={previewRef} style={{ opacity: isDragging ? 0 : 1 }}>
    {handle} {props.firstName} {props.lastName}
  </Row>
)

const Example = () => {
  const itemsInitial = [
    { id: 0, firstName: 'John', lastName: 'Doe' },
    { id: 1, firstName: 'Michael', lastName: 'Jackson' },
    { id: 2, firstName: 'David', lastName: 'Blaine' },
  ]
  const [items, setItems] = useState(itemsInitial)

  return (
    <SortableList
      DragHandle={DragHandle}
      items={items}
      ListItem={ItemWithDragHandle}
      moveItem={(dragIndex, hoverIndex) =>
        setItems(SortableList.moveItem(items, dragIndex, hoverIndex))
      }
    />
  )
}

export default Example
