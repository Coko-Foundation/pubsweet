A field which displays a value which turns into a text field for editing when clicked.

Hitting Enter saves the value and calls the `onSave` callback. Hitting Escape removes the text field and replaces the initial value.

```js
const [state, setState] = React.useState({ value: 'Initial value' })

;<div>
  <EditableValue
    inline
    value={state.value}
    onSave={newValue => setState({ value: newValue })}
  />

  <div>The current value is "{state.value}".</div>
</div>
```

You can set `required` on it, which will prevent it from saving if empty.

```js
const [state, setState] = React.useState({ value: 'Initial value' })
;<div>
  <EditableValue
    required
    inline
    value={state.value}
    onSave={newValue => setState({ value: newValue })}
  />

  <div>The current value is "{state.value}".</div>
</div>
```
