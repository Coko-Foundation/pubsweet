A component that can acts as switch input.  
Often useful in forms, but not limited to them.

Basic Toggle

```js
import { useState } from 'react'
const [state, setState] = useState({ checked: null })

;<Toggle
  name="toggle"
  checked={state.checked}
  onChange={event => setState({ checked: event.target.checked })}
/>
```

Toggle with label

```js
import { useState } from 'react'
const [state, setState] = useState({ checked: null })

;<Toggle
  name="toggle"
  label="LabelName"
  checked={state.checked}
  onChange={event => setState({ checked: event.target.checked })}
/>
```

Toggle with LabelChecked

```js
import { useState } from 'react'
const [state, setState] = useState({ checked: null })

;<Toggle
  name="toggle"
  label="Not Checked"
  labelChecked="Is Checked"
  checked={state.checked}
  onChange={event => setState({ checked: event.target.checked })}
/>
```
