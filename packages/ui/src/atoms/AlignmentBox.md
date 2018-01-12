Inactive

```js

const active = false;
const id = 'eyedee';
const noBorder = {};
const onClick = () => { return null };

<AlignmentBox
  active={active}
  id={id}
  noBorder={noBorder}
  onClick={onClick}
/>
```

Active

```js

const active = true;
const id = 'eyedee';
const noBorder = {};
const onClick = () => { return null };

<AlignmentBox
  active={active}
  id={id}
  noBorder={noBorder}
  onClick={onClick}
/>
```

Active with no right border

```js

const active = true;
const id = 'eyedee';
const noBorder = { right: true };
const onClick = () => { return null };

<AlignmentBox
  active={active}
  id={id}
  noBorder={noBorder}
  onClick={onClick}
/>
```
