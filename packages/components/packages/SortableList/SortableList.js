import React from 'react'
import { pick } from 'lodash'
import { compose } from 'recompose'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

const itemSource = {
  beginDrag(props) {
    return pick(props, props.beginDragProps)
  },
}

const itemTarget = {
  hover({ moveItem, index, listId }, monitor, component) {
    const { index: dragIndex, listId: toListId } = monitor.getItem()
    const hoverIndex = index

    if (listId !== toListId) {
      return
    }

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect() // eslint-disable-line
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
    if (typeof moveItem === 'function') {
      moveItem(dragIndex, hoverIndex)
    }
    monitor.getItem().index = hoverIndex
  },
  drop({ dropItem, ...restProps }, monitor) {
    if (dropItem && typeof dropItem === 'function')
      dropItem(restProps, monitor.getItem())
  },
}

const Item = ({
  connectDragPreview,
  connectDragSource,
  connectDropTarget,
  listItem,
  dragHandle,
  ...rest
}) =>
  dragHandle
    ? connectDragPreview(
        connectDropTarget(
          <div style={{ flex: 1 }}>
            {React.createElement(listItem, {
              ...rest,
              dragHandle: connectDragSource(
                <div style={{ display: 'flex' }}>
                  {React.createElement(dragHandle)}
                </div>,
              ),
            })}
          </div>,
        ),
      )
    : connectDropTarget(
        connectDragSource(
          <div style={{ flex: 1 }}>{React.createElement(listItem, rest)}</div>,
        ),
      )

const DecoratedItem = compose(
  DropTarget('item', itemTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
  DragSource('item', itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
)(Item)

const SortableList = ({
  items,
  itemKey = 'id',
  moveItem,
  listItem,
  dragHandle,
  editItem,
  ...rest
}) => (
  <div>
    {items.map((item, i) => (
      <DecoratedItem
        dragHandle={dragHandle}
        index={i}
        key={item[itemKey]}
        listItem={listItem}
        moveItem={moveItem}
        {...item}
        {...rest}
      />
    ))}
  </div>
)

// helper function for sortable lists
SortableList.moveItem = (items, dragIndex, hoverIndex) => {
  if (dragIndex <= hoverIndex) {
    return [
      ...items.slice(0, dragIndex),
      items[hoverIndex],
      items[dragIndex],
      ...items.slice(hoverIndex + 1),
    ]
  }
  return [
    ...items.slice(0, hoverIndex),
    items[dragIndex],
    items[hoverIndex],
    ...items.slice(dragIndex + 1),
  ]
}

export default SortableList
