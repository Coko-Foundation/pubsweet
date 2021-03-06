`Body` is the main section of the PeoplePicker (everything except the buttons). It combines SelectedItems, SelectionHint & PersonPodGrid

```js
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
    focuses: ['cell biology'],
    expertises: [
      'Biochemistry and Chemical Biology',
      'Chromosomes and Gene Expression',
    ],
  },
  {
    id: 3,
    name: 'Chastity Badger',
    aff: 'C Institute',
    focuses: ['computational and systems biology'],
    expertises: [
      'Developmental Biology',
      'Stem Cells and Regenerative Medicine',
    ],
  },
  {
    id: 4,
    name: 'Dave Badger',
    aff: 'D Research Lab',
    focuses: ['auditory cognition'],
    expertises: ['Neuroscience', 'Pumpkins', 'Chaffinches'],
  },
]

const [state, setState] = React.useState({
  selection: people.slice(0, 2),
})
;<PeoplePickerBody
  isSelected={person => state.selection.some(p => p.id === person.id)}
  maxSelection={5}
  minSelection={3}
  people={people}
  selection={state.selection}
  toggleSelection={person => {
    if (state.selection.some(p => p.id === person.id)) {
      setState({
        selection: state.selection.filter(p => p.id !== person.id),
      })
    } else {
      setState({ selection: state.selection.concat(person) })
    }
  }}
/>
```
