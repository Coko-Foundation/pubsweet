An interactive element which renders a text element from a given index of a provided array and upon click runs a provided update function, passing it the current text element and the index of the next item in the array, or 0 if the current item is the last.

If the update function is used to update the index, the component will cycle through the array on click.

```js
const values = ['To Clean', 'Cleaning', 'Cleaned']
const [index, setIndex] = React.useState(0)

const update = (currentValue, nextIndex) => {
  setIndex(nextIndex)
}
;<StateItem values={values} index={index} update={update} />
```

If the component is passed the disabled prop, the update function is not run:

```js
const values = ['To Clean', 'Cleaning', 'Cleaned']
const [index, setIndex] = React.useState(0)

const update = (currentValue, nextIndex) => {
  setState({ index: nextIndex })
}
;<StateItem values={values} index={index} disabled={true} update={update} />
```
