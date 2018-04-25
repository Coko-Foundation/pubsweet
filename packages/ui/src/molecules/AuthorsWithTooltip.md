Show authors list with tooltip for more details

### Default usage

```js
const authors = [
  {
    email: 'john.snow@example.com',
    lastName: 'John',
    firstName: 'Snow',
    affiliation: 'GOT',
    isSubmitting: true,
    isCorresponding: false,
  },
  {
    email: 'raymond.red@example.com',
    lastName: 'Raymond',
    firstName: 'Red',
    affiliation: 'The Blacklist',
    isSubmitting: false,
    isCorresponding: true,
  },
  {
    email: 'mark.spencer@example.com',
    lastName: 'Mark',
    firstName: 'Spencer',
    affiliation: 'Fashion',
    isSubmitting: false,
    isCorresponding: false,
  },
]
;<AuthorsWithTooltip authors={authors} />
```

### Custom usage

```js
const authors = [
  {
    email: 'john.snow@example.com',
    lastName: 'John',
    firstName: 'Snow',
    affiliation: 'GOT',
    isSubmitting: true,
    isCorresponding: false,
  },
  {
    email: 'raymond.red@example.com',
    lastName: 'Raymond',
    firstName: 'Red',
    affiliation: 'The Blacklist',
    isSubmitting: false,
    isCorresponding: true,
  },
  {
    email: 'mark.spencer@example.com',
    lastName: 'Mark',
    firstName: 'Spencer',
    affiliation: 'Fashion',
    isSubmitting: false,
    isCorresponding: false,
  },
]
;<AuthorsWithTooltip
  authors={authors}
  labelComponent={({ firstName, email }) => (
    <span key={email}>{`${firstName} -> `}</span>
  )}
  tooltipComponent={({ affiliation }) => <span>{affiliation}</span>}
/>
```
