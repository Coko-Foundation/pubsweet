A radio button.

```js
import { useState } from 'react'
const [state, setState] = useState({ value: undefined })

;<Radio
  name="radio"
  checked={state.value === 'on'}
  onChange={event => setState({ value: event.target.value })}
/>
```

A checked radio button.

```js
import { useState } from 'react'
const [state, setState] = useState({ value: 'on' })

;<Radio
  name="radio-checked"
  checked={state.value === 'on'}
  onChange={event => setState({ value: event.target.value })}
/>
```

A radio button with a label.

```js
import { useState } from 'react'
const [state, setState] = useState({ value: undefined })

;<Radio
  name="radio-checked"
  label="Foo"
  checked={state.value === 'on'}
  onChange={event => setState({ value: event.target.value })}
/>
```

A radio button with a color.

```js
import { useState } from 'react'
const [state, setState] = useState({ value: undefined })

;<Radio
  name="radio-color"
  label="Foo"
  color="red"
  checked={state.value === 'on'}
  onChange={event => setState({ value: event.target.value })}
/>
```
