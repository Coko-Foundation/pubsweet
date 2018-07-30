A form input for plain text.

```js
initialState = { value: '' }
;<TextField
  value={state.value}
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

The text field can have a label.

```js
initialState = { value: '' }
;<TextField
  label="Foo"
  value={state.value}
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

Text field with error state.

```js
initialState = { value: '' }
;<TextField
  label="Foo"
  value={state.value || 'This is not valid'}
  validationstatus="error"
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

Text field with warning state.

```js
initialState = { value: '' }
;<TextField
  label="Foo"
  value={state.value || 'This is could be a problem'}
  validationstatus="warning"
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```

Text field with success state.

```js
initialState = { value: '' }
;<TextField
  label="Foo"
  value={state.value || 'This is good'}
  validationstatus="success"
  placeholder="so you can write some in here"
  onChange={event => setState({ value: event.target.value })}
/>
```
