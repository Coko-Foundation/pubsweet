A form input for plain text.

```js
const [state, setState] = React.useState({ value: '' })
;<TextField
  value={state.value}
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

The text field can have a label.

```js
const [state, setState] = React.useState({ value: '' })
;<TextField
  label="Foo"
  value={state.value}
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

Text field with error state.

```js
const [state, setState] = React.useState({ value: '' })
;<TextField
  label="Foo"
  value={state.value || 'This is not valid'}
  validationStatus="error"
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

Text field with warning state.

```js
const [state, setState] = React.useState({ value: '' })
;<TextField
  label="Foo"
  value={state.value || 'This is could be a problem'}
  validationStatus="warning"
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

Text field with success state.

```js
const [state, setState] = React.useState({ value: '' })
;<TextField
  label="Foo"
  value={state.value || 'This is good'}
  validationStatus="success"
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```
