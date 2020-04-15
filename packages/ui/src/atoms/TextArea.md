A form input for large amounts of plain text.

```js
const [state, setState] = React.useState({ value: '' })
;<TextArea
  value={state.value}
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

The text area can have a label.

```js
const [state, setState] = React.useState({ value: '' })
;<TextArea
  label="Foo"
  value={state.value}
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

By default in most browsers, the textarea is expandable. You can increase or decrease the number of rows initially shown.

```js
const [state, setState] = React.useState({ value: '' })
;<TextArea
  label="Foo"
  value={state.value}
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
  rows={10}
/>
```
