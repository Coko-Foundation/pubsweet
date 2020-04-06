import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'

const Item = ({ id, ListItem, index, moveItem, DragHandle, ...rest }) => {
  const previewRef = useRef(null)
  const handleRef = useRef(null)

  // console.log(id, previewRef.current, handleRef.current)
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'Item', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'Item',
    hover(item, monitor) {
      if (!previewRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = previewRef.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action

      moveItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  DragHandle ? drag(handleRef) : drag(previewRef)
  preview(previewRef)
  drop(previewRef)

  return (
    <ListItem
      handle={DragHandle ? <DragHandle handleRef={handleRef} /> : null}
      isDragging={isDragging}
      previewRef={previewRef}
      {...rest}
    />
  )
}

const SortableList = ({
  items,
  itemKey = 'id',
  moveItem,
  ListItem,
  DragHandle,
  ...rest
}) => (
  <>
    {items.map((item, i) => (
      <Item
        DragHandle={DragHandle}
        id={item[itemKey]}
        index={i}
        key={item[itemKey]}
        ListItem={ListItem}
        moveItem={moveItem}
        {...item}
        {...rest}
      />
    ))}
  </>
)

// helper function for sortable lists
SortableList.moveItem = (items, dragIndex, hoverIndex) => {
  const item = items[dragIndex]
  return update(items, {
    $splice: [
      [dragIndex, 1],
      [hoverIndex, 0, item],
    ],
  })
}

export default SortableList
