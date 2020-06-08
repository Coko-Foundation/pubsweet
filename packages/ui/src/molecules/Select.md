Select component uses [react-select](https://react-select.com) library.

Common props that can be used:

### Props

| Prop         | Description                                                                                        | Type     |
| ------------ | -------------------------------------------------------------------------------------------------- | -------- |
| autoFocus    | focus the control when it mounts                                                                   | boolean  |
| isDisabled   | disable the control                                                                                | boolean  |
| isMulti      | allow the user to select multiple values                                                           | boolean  |
| isSearchable | allow the user to search for matching options                                                      | boolean  |
| onChange     | handle change events on the select                                                                 | function |
| options      | specify the options the user can select from                                                       | array    |
| placeholder  | text displayed when no option is selected                                                          | string   |
| name         | name of the HTML Input (optional - without this, no input will be rendered)                        | string   |
| value        | control the current value                                                                          | union    |
| components   | this property allows to replace [default components](https://react-select.com/props) with your own | any      |

For the full list check the [props documentation](https://react-select.com/props).

### Controllable Props

You can control the following props by providing values for them.

- value / onChange - specify the current value of the control
- menuIsOpen / onMenuOpen / onMenuClose - control whether the menu is open
- inputValue / onInputChange - control the value of the search input (changing this will update the available options)

### Example

```js
import Select from './Select'

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
  { value: 'fourth', label: 'Fourth' },
]

;<Select options={options} isClearable />
```
