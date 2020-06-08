A checkbox.

```js
import { useState } from 'react'
const [state, setState] = useState({ checked: null })

;<Checkbox
  name="checkbox"
  checked={state.checked}
  onChange={event => setState({ checked: event.target.checked })}
/>
```

A checked checkbox.

```js
import { useState } from 'react'
const [state, setState] = useState({ checked: true })

;<Checkbox
  name="checkbox-checked"
  checked={state.checked}
  onChange={event => setState({ checked: event.target.checked })}
/>
```

A checkbox with a label.

```js
import { useState } from 'react'
const [state, setState] = useState({ checked: false })

;<Checkbox
  name="checkbox-labelled"
  checked={state.checked}
  label="Foo"
  onChange={event => setState({ checked: event.target.checked })}
/>
```
