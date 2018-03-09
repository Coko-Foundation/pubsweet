### Option props

All menu item options will be passed the same props.

* _selected_ - the current selected option
* _label_ - the label of the option
* _value_ - the value of the option
* _handleSelect_ - handler called when clicking on the option
* _handleKeyPress_ - keyboard handler

A menu for selecting one of a list of options.

```js
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
  { value: 'baz', label: 'Baz' },
]
;<Menu options={options} onChange={value => console.log(value)} />
```

When an option is selected, it replaces the placeholder.

```js
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
  { value: 'baz', label: 'Baz' },
]
;<Menu options={options} value="foo" onChange={value => console.log(value)} />
```

A menu can have a label

```js
const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
  { value: 'baz', label: 'Baz' },
]
;<Menu
  options={options}
  label="Title"
  value="foo"
  onChange={value => console.log(value)}
/>
```

A menu can use a custom option component

```js
const CustomOption = ({ selected, label, value, handleSelect }) => (
  <div onClick={() => handleSelect(value)}>
    <span>Custom thing: {label}</span>
  </div>
)

const options = [
  { value: 'foo', label: 'Foo' },
  { value: 'bar', label: 'Bar' },
  { value: 'baz', label: 'Baz' },
]
;<Menu
  options={options}
  label="Title"
  value="foo"
  onChange={value => console.log(value)}
  renderOption={CustomOption}
/>
```
