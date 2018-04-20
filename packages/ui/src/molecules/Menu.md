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
  placeholder="select something"
  onChange={value => console.log(value)}
/>
```

A menu can use a custom components for the opener and for the options.

**Opener props** - the opener component will be passed the following props

* _toggleMenu_ - function to open the options container
* _open_ - whether the options are shown or not
* _selected_ - the selected option's value
* _placeholder_ - placeholder when no option is selected
* _optionLabel_ - function to display the selected option's label

**Option props** - all menu item options will be passed the same props

* _selected_ - the current selected option
* _label_ - the label of the option
* _value_ - the value of the option
* _handleSelect_ - handler called when clicking on the option
* _handleKeyPress_ - keyboard handler

```js
;<div /> //hacky workaround for https://github.com/styleguidist/react-styleguidist/issues/886

const CustomOption = ({ selected, label, value, handleSelect }) => (
  <div
    onClick={() => handleSelect(value)}
    style={{ cursor: 'pointer', padding: 10 }}
  >
    <span>Custom thing: {label}</span>
  </div>
)

const CustomOpener = ({
  toggleMenu,
  open,
  selected,
  placeholder,
  optionLabel,
}) => (
  <div
    onClick={toggleMenu}
    style={{
      backgroundColor: '#aaa',
      cursor: 'pointer',
      padding: 10,
      borderRadius: 5,
    }}
  >
    {selected ? (
      <span>Custom opener: {optionLabel(selected)}</span>
    ) : (
      <span>{placeholder}</span>
    )}
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
  placeholder="select something"
  onChange={value => console.log(value)}
  renderOption={CustomOption}
  renderOpener={CustomOpener}
/>
```
