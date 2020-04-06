A sortable list implemented with `react-dnd`.

## Props

|      Prop      |                                                                 Description                                                                  | Required | Default |      Type       |
| :------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :-------------: |
|     items      |                                                       The items of the sortable list.                                                        |   true   |   []    |      Array      |
|    itemKey     |                                                 Value used for key when mapping over items.                                                  |   true   |  'id'   |     string      |
|    ListItem    | A React component that will be rendered for each item of the list. Receives `isDragging`, `isOver` and all other props from the items array. |   true   |  none   | React component |
|    moveItem    |       Function to be called when moving an item through the list. SortableList will provide the dragIndex of hoverIndex of the items.        |   true   |  none   |    function     |
|   DragHandle   |                            A React component for the drag handle. If not present, the whole item can be dragged.                             |  false   |  none   | React component |
|    dropItem    |                            Function to be called when dropping an item. The index of the dragged item is passed.                             |  false   |  none   |    function     |
| beginDragProps |                                      Array of keys to pick from the dragged object when beginning drag.                                      |  false   |   []    |  Array(string)  |

## Usage

This component should be used with a React-DnD context `DndProvider` and `react-dnd-html5-backend`.

```js static
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default class YourApp {
  render() {
    return <DndProvider backend={Backend}>/* ... */</DndProvider>
  }
}
```

### Pass in a list of users

```js static
const items = [
  {firstName: 'John', lastName: 'Doe'},
  {firstName: 'Michael', lastName: 'Jackson'},
  {firstName: 'David', lastName: 'Blaine'},
]

const Item = ({ isDragging, ...rest }) =>
  <div>`${rest.firstName} ${rest.lastName}`</div>

<SortableList
  items={items}
  listItem={Item}
  moveItem={(dragIndex, hoverIndex) => change items}
  />
```

```jsx
import React, { useState, useCallback } from 'react'
const itemsInitial = [
  { id: 0, firstName: 'John', lastName: 'Doe' },
  { id: 1, firstName: 'Michael', lastName: 'Jackson' },
  { id: 2, firstName: 'David', lastName: 'Blaine' },
]
const [items, setItems] = useState(itemsInitial)
const Item = ({ previewRef, isDragging, ...rest }) => (
  <div ref={previewRef} style={{ opacity: isDragging ? 0 : 1 }}>
    {rest.firstName} {rest.lastName}
  </div>
)

;<SortableList
  items={items}
  ListItem={Item}
  moveItem={useCallback(
    (dragIndex, hoverIndex) => {
      setItems(SortableList.moveItem(items, dragIndex, hoverIndex))
    },
    [items],
  )}
/>
```

### With custom drag handle

```js static
const DragHandle = ({ handleRef }) => {
  return <div ref={handleRef}>Drag me!</div>
}

const ItemWithDragHandle = ({ previewRef, handle, isDragging, ...props }) => {
  return (
    <div ref={previewRef} style={{ opacity: isDragging ? 0 : 1 }}>
      {handle} {props.firstName} {props.lastName}
    </div>
  )
}

;<SortableList items={} ListItem={ItemWithDragHandle} DragHandle={DragHandle} />
```

Example:

```jsx
import React, { useState, useCallback } from 'react'
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const itemsInitial = [
  { id: 0, firstName: 'John', lastName: 'Doe' },
  { id: 1, firstName: 'Michael', lastName: 'Jackson' },
  { id: 2, firstName: 'David', lastName: 'Blaine' },
]
const [items, setItems] = useState(itemsInitial)

const DragHandle = ({ handleRef }) => {
  return <div ref={handleRef}>Drag me!</div>
}

const ItemWithDragHandle = ({ previewRef, handle, isDragging, ...props }) => {
  return (
    <div ref={previewRef} style={{ opacity: isDragging ? 0 : 1 }}>
      {handle} {props.firstName} {props.lastName}
    </div>
  )
}

;<SortableList
  items={items}
  ListItem={ItemWithDragHandle}
  DragHandle={DragHandle}
  moveItem={(dragIndex, hoverIndex) => {
    return setItems(SortableList.moveItem(items, dragIndex, hoverIndex))
  }}
/>
```
