Please note: the PeoplePicker is a combination of the `PeoplePickerLayout` (how it's rendered) & the `PeoplePickerLogic` (how the sub-components interact)

The People Picker Layout is responsible for rendering the `PeoplePickerBody`, `PeoplePickerButtons` & `SearchBox` in eLife's chosen order - search at the top, then grid, then buttons below.

### Search box behaviour within the People Picker

Upon opening the People Picker Modal, the search box is empty.

The user can search by name, affiliation or subject areas.

To update the list of peron pods the user has to press enter or click on the search icon after typing something.

Searching for an empty string returns all person pods.

Currently the input won't generate a dropdown list of suggestions (but will at some point in the future).

### Overriding the Search box:

The `PeoplePicker` supports overriding the search box with an optional custom component. A working example of this can be found in the source code, assigned to the variable `InputOverride`. The injected
component is always rendered when present, and is passed the following props:

- `onClearHandler`: a function that is called to clear the search input
- `onSearchHandler`: a function that executes the search
- `onChange` & `onKeyDown`: Updates some autocomplete stuff, should be attached to whatever input field is in the search box.
- `placeholder`: Placeholder text, defualts to _'Search string here...'_
- `value`: The string value of the search box

```js
const InputOverride = ({
  onClearHandler,
  onSearchHandler,
  onChange,
  onKeyPress,
  placeholder,
  value,
}) => (
  <div>
    <input
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      value={value}
    />
    <button onClick={onSearchHandler}>search</button>
    <button onClick={onClearHandler}>clear</button>
  </div>
)
const PeoplePickerBody = require('./PeoplePickerBody').default
const PeoplePickerButtons = require('./PeoplePickerButtons').default
const people = [
  {
    id: 1,
    name: 'Annie Badger',
    aff: 'A University',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 2,
    name: 'Bobby Badger',
    aff: 'B College',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 3,
    name: 'Chastity Badger',
    aff: 'C Institute',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 4,
    name: 'Dave Badger',
    aff: 'D Research Lab',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
]

const getPeople = searchValue => {
  if (!searchValue) return people

  const inputValue = searchValue.trim().toLowerCase()
  if (!inputValue) return people

  return people.filter(person => person.name.toLowerCase().includes(inputValue))
}

const [state, setState] = React.useState({
  open: false,
})
;<PeoplePickerLayout
  inputOverrideComponent={
    undefined /* InputOverride (if you want to override the input) */
  }
  initialSelection={[people[1]]}
  minSelection={1}
  maxSelection={3}
  onSubmit={selection => console.log('Selected', selection)}
  onCancel={() => console.log('Cancelled')}
  people={getPeople}
>
  {props => (
    <React.Fragment>
      <PeoplePickerButtons {...props} />
      <hr />
      <PeoplePickerBody {...props} />
    </React.Fragment>
  )}
</PeoplePickerLayout>
```

```js
const PeoplePickerBody = require('./PeoplePickerBody').default
const PeoplePickerButtons = require('./PeoplePickerButtons').default

// @todo put this in a separate file and import
const people = [
  {
    id: 1,
    name: 'Annie Badger',
    aff: 'A University',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 2,
    name: 'Bobby Badger',
    aff: 'B College',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 3,
    name: 'Chastity Badger',
    aff: 'C Institute',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 4,
    name: 'Dave Badger',
    aff: 'D Research Lab',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
]

const [state, setState] = React.useState({
  open: false,
})
;<PeoplePickerLayout
  initialSelection={[people[1]]}
  minSelection={1}
  maxSelection={3}
  onSubmit={selection => console.log('Selected', selection)}
  onCancel={() => console.log('Cancelled')}
  people={people}
>
  {props => (
    <React.Fragment>
      <PeoplePickerButtons {...props} />
      <hr />
      <PeoplePickerBody {...props} />
    </React.Fragment>
  )}
</PeoplePickerLayout>
```

```js
const PeoplePickerBody = require('./PeoplePickerBody').default
const PeoplePickerButtons = require('./PeoplePickerButtons').default

// @todo put this in a separate file and import
const people = [
  {
    id: 1,
    name: 'Annie Badger',
    aff: 'A University',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 2,
    name: 'Bobby Badger',
    aff: 'B College',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 3,
    name: 'Chastity Badger',
    aff: 'C Institute',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 4,
    name: 'Dave Badger',
    aff: 'D Research Lab',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
]

const getPeople = (people, searchValue) => {
  if (!searchValue) return people

  const inputValue = searchValue.trim().toLowerCase()
  if (!inputValue) return people

  return people.filter(person => person.name.toLowerCase().includes(inputValue))
}

const [state, setState] = React.useState({
  open: false,
})
;<PeoplePickerLayout
  initialSelection={[people[1]]}
  minSelection={1}
  maxSelection={3}
  onSubmit={selection => console.log('Selected', selection)}
  onCancel={() => console.log('Cancelled')}
  people={people}
  searchBoxPlaceholder="Search by name, etc."
  customFilterFn={getPeople}
>
  {props => (
    <React.Fragment>
      <PeoplePickerButtons {...props} />
      <hr />
      <PeoplePickerBody {...props} />
    </React.Fragment>
  )}
</PeoplePickerLayout>
```
