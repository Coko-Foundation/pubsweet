CSS variables are used to define font families.

### fontInterface

```js
const FontInterface = require('styled-components').default.div`
  font-family: ${props => props.theme.fontInterface};
`
;<FontInterface>{faker.lorem.sentence(5)}</FontInterface>
```

### fontHeading

```js
const FontHeading = require('styled-components').default.div`
  font-family: ${props => props.theme.fontHeading};
`
;<FontHeading>{faker.lorem.sentence(5)}</FontHeading>
```

### fontReading

```js
const FontReading = require('styled-components').default.div`
  font-family: ${props => props.theme.fontReading};
`
;<FontReading>{faker.lorem.sentence(5)}</FontReading>
```

### fontWriting

```js
const FontWriting = require('styled-components').default.div`
  font-family: ${props => props.theme.fontWriting};
`
;<FontWriting>{faker.lorem.sentence(5)}</FontWriting>
```
