An interactive element which upon click changes its text content. The available text values should be provided as an array of strings. The actual operation which takes place is a right shift on the array of provided values

```js
const data = {
  values: ['To Clean', 'Cleaning', 'Cleaned'],
  index: 0,
  disabled: false,
  name: 'clean',
}

const update = value => {
  console.log('value', value)
}

;<StateItem
  values={data.values}
  disabled={data.disabled}
  update={update}
  index={data.index}
  name={data.name}
/>
```
