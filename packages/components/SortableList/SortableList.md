A sortable list implemented with `react-dnd`.

## Props

|      Prop      |                                                                 Description                                                                  | Required | Default |      Type       |
| :------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :------: | :-----: | :-------------: |
|     items      |                                                       The items of the sortable list.                                                        |   true   |   []    |      Array      |
|    itemKey     |                                                 Value used for key when mapping over items.                                                  |   true   |  'id'   |     string      |
|    listItem    | A React component that will be rendered for each item of the list. Receives `isDragging`, `isOver` and all other props from the items array. |   true   |  none   | React component |
|    moveItem    |       Function to be called when moving an item through the list. SortableList will provide the dragIndex of hoverIndex of the items.        |   true   |  none   |    function     |
|   dragHandle   |                            A React component for the drag handle. If not present, the whole item can be dragged.                             |  false   |  none   | React component |
|    dropItem    |                            Function to be called when dropping an item. The index of the dragged item is passed.                             |  false   |  none   |    function     |
| beginDragProps |                                      Array of keys to pick from the dragged object when beginning drag.                                      |  false   |   []    |  Array(string)  |

## Usage

This component should be used in a React-DnD `DragDropContext` or `DragDropContextProvider`. Make sure you have `react-dnd-html5-backend` installed and wrap the parent component with `DragDropContext` decorator or add the `DragDropContextProvider` in your root component.

```js static
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class YourApp {
  /* ... */
}

export default DragDropContext(HTML5Backend)(YourApp)
```

or

```js static
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'

export default class YourApp {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        /* ... */
      </DragDropContextProvider>
    )
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

const Item = ({ isOver, isDragging, ...rest }) =>
  <div>`${rest.firstName} ${rest.lastName}`</div>

<SortableList
  items={items}
  listItem={Item}
  moveItem={(dragIndex, hoverIndex) => change items}
  />
```

### With custom drag handle

```js static
const DragHandle = () => <div>Drag me!</div>

const ItemWithDragHandle = ({ dragHandle, ...rest }) => <div>
    {dragHandle}
    <span>Rest of the content.</span>
  </div>

<SortableList
  ...
  listItem={ItemWithDragHandle}
  dragHandle={DragHandle}
  ...
  />
```

### How to move items around

To move items of the parent container whenever `moveItem` function is called we can use the `SortableList.moveItem` helper. More info in the example below.

```js static
const Container = ({ moveItem, items }) => (
  <div>
    ...
    <SortableList items={items} listItem={Item} moveItem={moveItem} />
    ...
  </div>
)
```

Enhanced using recompose

```js static
const MoveExample = compose(
  withState('items', 'setItems', [
    { name: 'John' },
    { name: 'Nancy' },
    { name: 'Adam' },
  ]),
  withHandlers({
    moveItem: ({ setItems, items }) => (dragIndex, hoverIndex) => {
      setItems(prevItems =>
        SortableList.moveItem(prevItems, dragIndex, hoverIndex),
      )
    },
  }),
)(Container)
```
