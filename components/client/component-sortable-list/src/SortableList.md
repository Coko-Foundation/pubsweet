A sortable list implemented with `react-dnd`.

## Props

|    Prop    |                                                                 Description                                                                  | Required | Default |      Type       |
| :--------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :-------------: |
|   items    |                                                       The items of the sortable list.                                                        |   true   |   []    |      Array      |
|  itemKey   |                                                 Value used for key when mapping over items.                                                  |   true   |  'id'   |     string      |
|  ListItem  | A React component that will be rendered for each item of the list. Receives `isDragging`, `isOver` and all other props from the items array. |   true   |  none   | React component |
|  moveItem  |       Function to be called when moving an item through the list. SortableList will provide the dragIndex of hoverIndex of the items.        |   true   |  none   |    function     |
| DragHandle |                            A React component for the drag handle. If not present, the whole item can be dragged.                             |  false   |  none   | React component |
|  dropItem  |                            Function to be called when dropping an item. The index of the dragged item is passed.                             |  false   |  none   |    function     |

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

### Pass in a list

The full code for this example is [in the `component-sortable-list`](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/components/client/component-sortable-list/examples/Example.jsx).

```js static
const items = [
  {firstName: 'John', lastName: 'Doe'},
  {firstName: 'Michael', lastName: 'Jackson'},
  {firstName: 'David', lastName: 'Blaine'},
]

const Item = ({ previewRef, isDragging, ...rest }) =>
  <div ref={previewRef}>`${rest.firstName} ${rest.lastName}`</div>

<SortableList
  items={items}
  listItem={Item}
  moveItem={(dragIndex, hoverIndex) => change items}
  />
```

```jsx
import Example from '../examples/Example.jsx'

;<Example />
```

### With custom drag handle

The full code for this example is [in the `component-sortable-list`](https://gitlab.coko.foundation/pubsweet/pubsweet/tree/master/components/client/component-sortable-list/examples/Example-handle.jsx).

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
import Example from '../examples/Example-handle.jsx'
;<Example />
```
