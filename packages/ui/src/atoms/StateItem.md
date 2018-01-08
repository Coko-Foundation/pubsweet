State Item

```js
const data =
  {
    values:['To Clean', 'Cleaning', 'Cleaned'],
    index: 0,
    disabled: false,
    name: 'clean',
  };

const update = (value) => {
  console.log('value', value)
};

<StateItem
  values={data.values}
  disabled={data.disabled}
  update={update}
  index={data.index}
  name={data.name}
/>
```
