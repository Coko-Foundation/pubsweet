AligmentBox with Label on the left

```js

const active = true;
const id = 'eyedee';
const labelText = 'left';
const noBorder = {};
const onClick = () => { return null };

<AlignmentBoxWithLabel
  active={active}
  id={id}
  labelText={labelText}
  noBorder={noBorder}
  onClick={onClick}
/>
```

Inactive AligmentBox with Label on the right

```js

const active = false;
const id = 'eyedee';
const labelPositionRight = true;
const labelText = 'right';
const noBorder = {};
const onClick = () => { return null };

<AlignmentBoxWithLabel
  active={active}
  id={id}
  labelPositionRight={labelPositionRight}
  labelText={labelText}
  noBorder={noBorder}
  onClick={onClick}
/>
```
