Single Selection

```js
const options = [
  { value: 'firstoption', label: 'First' },
  { value: 'secondoption', label: 'Second' },
  { value: 'thirdoption', label: 'Third' },
  { value: 'thirdoption', label: 'Fourth' },
]

;<SelectDropdown options={options} />
```

Selection menu opens up from above

```js
const options = [
  { value: 'firstoption', label: 'One' },
  { value: 'secondoption', label: 'Two' },
  { value: 'thirdoption', label: 'Three' },
  { value: 'thirdoption', label: 'Four' },
]

;<SelectDropdown options={options} menuPlacement="top" />
```

Multiple select

```js
const options = [
  { value: 'firstoption', label: 'First Option' },
  { value: 'secondoption', label: 'Second Option' },
  { value: 'thirdoption', label: 'Third Option' },
]

;<SelectDropdown options={options} isMulti />
```
