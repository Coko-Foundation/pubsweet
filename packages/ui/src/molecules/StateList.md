A list of State Items separated by a delimiter.

```js
const current = {
  style: 0,
  edit: 0,
  clean: 0,
  review: 0,
}
const stateValues = {
  clean: ['To Clean', 'Cleaning', 'Cleaned'],
  edit: ['To Edit', 'Editing', 'Edited'],
  review: ['To Review', 'Reviewing', 'Reviewed'],
  style: ['To Style', 'Styling', 'Styled'],
}
const update = data => {
  console.log('data', data)
}
;<StateList currentValues={current} values={stateValues} update={update} />
```
