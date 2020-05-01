A dropdown button component, usually used on menus to wrap more than one option together.

A primary dropdown.

```js
const itemsList = [
  {
    id: 1,
    onClick: () => {},
    title: 'item 1n  asfasf asfkaskfh  ',
  },
  { id: 2, title: 'item 2' },
]

;<Dropdown itemsList={itemsList} primary>
  Open
</Dropdown>
```

A non-primary dropdown

```js
const itemsList = [
  {
    id: 1,
    onClick: () => {},
    title: 'item 1 with long text  ',
  },
  { id: 2, title: 'item 2' },
]

;<Dropdown itemsList={itemsList}>Open list</Dropdown>
```

Dropdown which opens from above and has also an icon.

```js
const itemsList = [
  {
    id: 1,
    onClick: () => {},
    title: 'item 1',
  },
  { id: 2, title: 'item 2' },
]

;<Dropdown itemsList={itemsList} primary direction="up" icon="user">
  Open
</Dropdown>
```

Dropdown with icon at the end.

```js
const itemsList = [
  {
    id: 1,
    onClick: () => {},
    title: 'item 1 item 1 item 1 item 1',
  },
  { id: 2, title: 'item 2' },
]

;<Dropdown icon="user" iconPosition="end" itemsList={itemsList} secondary>
  Very very long name for the button
</Dropdown>
```
