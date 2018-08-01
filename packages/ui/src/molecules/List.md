A component that displays items in a vertical list. Can be customized with a custom list item component.

* Items as props

```js
const items = [{ id: 1, name: 'First item' }, { id: 2, name: 'Second item' }]

;<List items={items} />
```

* Use custom keys (in case your items don't have an id or you just want to be different)

```js
const items = [{ id: 1, name: 'First item' }, { id: 2, name: 'Second item' }]

;<List items={items} itemKey="name" />
```

* Pass function on each item click

```js
const items = [{ id: 1, name: 'First item' }, { id: 2, name: 'Second item' }]

;<List
  items={items}
  onItemClick={item => console.log('I clicked on: ', item)}
/>
```

* Custom item component
  Pass the item component as a render prop.

```js
const items = [{ id: 1, name: 'First item' }, { id: 2, name: 'Second item' }]

const CustomItem = item => (
  <span style={{ backgroundColor: 'lavender', fontSize: '20px' }}>
    <b>{item.id}</b>
    {` ${item.name}`}
  </span>
)

;<List items={items} component={CustomItem} />
```

* Items as children

```js
<List>
  <span>First item</span>
  <span>Second item</span>
  <span>Third item</span>
</List>
```

* Why not both?
  Items passed as props to the List component will be displayed first.

```js
const items = [{ id: 1, name: 'First item' }, { id: 2, name: 'Second item' }]

;<List items={items}>
  <span>First child</span>
  <span>Second child</span>
  <span>Third child</span>
</List>
```
