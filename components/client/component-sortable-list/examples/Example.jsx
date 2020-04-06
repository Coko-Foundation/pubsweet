/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import SortableList from '../src'

const Row = styled.div`
	height: calc(${th('gridUnit')} * 4);
	border: 1px ${th('colorPrimary')} solid;
	line-height: calc(${th('gridUnit')} * 4);
	padding: ${th('gridUnit')}
  margin-bottom: 1em;
`
const Item = ({ previewRef, isDragging, ...rest }) => (
  <Row ref={previewRef} style={{ opacity: isDragging ? 0 : 1 }}>
    {rest.firstName} {rest.lastName}
  </Row>
)
const Example = () => {
  const itemsInitial = [
    { id: 0, firstName: 'John', lastName: 'Doe' },
    { id: 1, firstName: 'Michael', lastName: 'Jackson' },
    { id: 2, firstName: 'David', lastName: 'Blaine' },
  ]
  const [items, setItems] = React.useState(itemsInitial)

  return (
    <SortableList
      // eslint-disable-next-line no-console
      dropItem={item => console.log(item)}
      items={items}
      ListItem={Item}
      moveItem={React.useCallback(
        (dragIndex, hoverIndex) => {
          setItems(SortableList.moveItem(items, dragIndex, hoverIndex))
        },
        [items],
      )}
    />
  )
}

export default Example
