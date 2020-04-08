SelectDropdown is a customized version of `Select` component, where we pass also a custom component for the `DropdownIndicator` icon and label.

Single Selection dropdown.

```js
const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
  { value: 'fourth', label: 'Fourth' },
]

;<SelectDropdown
  options={options}
  placeholder="Select something"
  isClearable
  label="LabelName"
/>
```

Selection menu opens up from above. Also has the option to add a custom icon.

```js
const options = [
  { value: 'firstoption', label: 'One' },
  { value: 'secondoption', label: 'Two' },
  { value: 'thirdoption', label: 'Three' },
  { value: 'fourthoption', label: 'Four' },
]

;<SelectDropdown
  options={options}
  menuPlacement="top"
  onChange={value => console.log(value)}
  icon="chevron_up"
/>
```

Multiple selection

```js
const options = [
  { value: 'one', label: 'First Option' },
  { value: 'two', label: 'Second Option' },
  { value: 'three', label: 'Third Option' },
]

;<SelectDropdown options={options} isMulti />
```
