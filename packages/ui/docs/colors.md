CSS variables are used to define the theme's color scheme.

## Brand colors

`colorText`

Default font color

```js
const ColorText = require('styled-components').default.div`
  color: ${props => props.theme.colorText};
`
;<ColorText>{faker.lorem.sentence(5)}</ColorText>
```

`colorTextReverse`

Reverse font color

```js
const ColorTextReverse = require('styled-components').default.div`
  background-color: ${props => props.theme.colorText};
  color: ${props => props.theme.colorTextReverse};
`
;<ColorTextReverse>{faker.lorem.sentence(5)}</ColorTextReverse>
```

`colorPrimary`

Indicates a primary call to action

```js
const ColorPrimary = require('styled-components').default.div`
  color: ${props => props.theme.colorPrimary};
`
;<ColorPrimary>{faker.lorem.sentence(5)}</ColorPrimary>
```

`colorSecondary`

Default color for non-primary actions

```js
const ColorSecondary = require('styled-components').default.div`
  color: ${props => props.theme.colorSecondary};
`
;<ColorSecondary>{faker.lorem.sentence(5)}</ColorSecondary>
```

`colorFurniture`

Meant to be applied to elements that indicate content division

```js
const Divider = require('styled-components').default.span`
  color: ${props => props.theme.colorFurniture};
`
;<div>
  {faker.lorem.sentence(2)}
  <Divider> | </Divider>
  {faker.lorem.sentence(2)}
  <Divider> | </Divider>
  {faker.lorem.sentence(2)}
</div>
```

`colorBorder`

For borders around form elements

```js
<TextField inline value={faker.lorem.sentence(3)} />
```

`colorTextPlaceholder`

Used for text field placeholders

```js
<TextField inline placeholder={faker.lorem.sentence(3)} />
```

`colorBackgroundHue`

Used to create a discrete contrast the default background color

```js
const BackgroundHue = require('styled-components').default.div`
  background-color: ${props => props.theme.colorBackgroundHue};
`
;<div>
  <div>{faker.lorem.sentence(5)}</div>
  <BackgroundHue>{faker.lorem.sentence(5)}</BackgroundHue>
  <div>{faker.lorem.sentence(5)}</div>
  <BackgroundHue>{faker.lorem.sentence(5)}</BackgroundHue>
  <div>{faker.lorem.sentence(5)}</div>
</div>
```

## Colors for interactions

`colorSuccess`

Used to indicate a successful validation state

```js
const ColorSuccess = require('styled-components').default.div`
  color: ${props => props.theme.colorSuccess};
`
;<ColorSuccess>{faker.lorem.sentence(5)}</ColorSuccess>
```

Used to indicate an error in validation

`colorError`

```js
const ColorError = require('styled-components').default.div`
  color: ${props => props.theme.colorError};
`
;<ColorError>{faker.lorem.sentence(5)}</ColorError>
```
