### colorSuccess

Used to indicate a successful validation state

```js
const ColorSuccess = require('styled-components').default.div`
  color: ${props => props.theme.colorSuccess};
`
;<ColorSuccess>{faker.lorem.sentence(5)}</ColorSuccess>
```

### colorWarning

Used to indicate a validation warning

```js
const ColorWarning = require('styled-components').default.div`
  color: ${props => props.theme.colorWarning};
`
;<ColorWarning>{faker.lorem.sentence(5)}</ColorWarning>
```

Used to indicate an error in validation

### colorError

```js
const ColorError = require('styled-components').default.div`
  color: ${props => props.theme.colorError};
`
;<ColorError>{faker.lorem.sentence(5)}</ColorError>
```
