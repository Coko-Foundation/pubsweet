CSS variables are used to define font families.

`--font-interface`

```js
const FontInterface = require('styled-components').default.div`
  font-family: ${props => props.theme.fontInterface};
`
;<FontInterface>{faker.lorem.sentence(5)}</FontInterface>
```

`--font-heading`

```js
const FontHeading = require('styled-components').default.div`
  font-family: ${props => props.theme.fontHeading};
`
;<FontHeading>{faker.lorem.sentence(5)}</FontHeading>
```

`--font-reading`

```js
const FontReading = require('styled-components').default.div`
  font-family: ${props => props.theme.fontReading};
`
;<FontReading>{faker.lorem.sentence(5)}</FontReading>
```

`--font-writing`

```js
const FontWriting = require('styled-components').default.div`
  font-family: ${props => props.theme.fontWriting};
`
;<FontWriting>{faker.lorem.sentence(5)}</FontWriting>
```
