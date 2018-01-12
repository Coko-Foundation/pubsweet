AligmentTool with left box active

```js
const data = [
  {
    active: true,
    id: 'left',
    label: 'left'
  },
  {
    active: false,
    id: 'right',
    label: 'right'
  }
];

const onClickAlignmentBox = () => null;

<AlignmentTool
  data={data}
  onClickAlignmentBox={onClickAlignmentBox}
/>
```
