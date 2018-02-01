CSS variables are used to define the theme's color scheme.

## Brand colors

`--color-text`

Default font color

```js
<div style={{ color: 'var(--color-text)' }}>{faker.lorem.sentence(5)}</div>
```

`--color-text-reverse`

Reverse font color

```js
<div
  style={{
    background: 'var(--color-text)',
    color: 'var(--color-text-reverse)',
  }}
>
  {faker.lorem.sentence(5)}
</div>
```

`--color-primary`

Indicates a primary call to action

```js
<div style={{ color: 'var(--color-primary)' }}>{faker.lorem.sentence(5)}</div>
```

`--color-secondary`

Default color for non-primary actions

```js
<div style={{ color: 'var(--color-secondary)' }}>{faker.lorem.sentence(5)}</div>
```

`--color-furniture`

Meant to be applied to elements that indicate content division

```js
<div style={{ color: 'var(--color-furniture)' }}>{faker.lorem.sentence(5)}</div>
```

`--color-border`

For borders around form elements

```js
<input
  type="text"
  style={{
    border: 'var(--border-width) var(--border-style) var(--color-border)',
    borderRadius: 'var(--border-radius)',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-base)',
    padding: '12px',
  }}
  value={faker.lorem.sentence(5)}
/>
```

`--color-text-placeholder`

Used for text field placeholders

```js
<input
  type="text"
  style={{
    border: 'var(--border-width) var(--border-style) var(--color-border)',
    borderRadius: 'var(--border-radius)',
    color: 'var(--color-text-placeholder)',
    fontSize: 'var(--font-size-base)',
    padding: '12px',
  }}
  placeholder="First name"
/>
```

`--color-background-hue`

Used to create a discrete contrast the default background color

```js
<div>
  <div>{faker.lorem.sentence(5)}</div>
  <div style={{ background: 'var(--color-background-hue)' }}>
    {faker.lorem.sentence(5)}
  </div>
  <div>{faker.lorem.sentence(5)}</div>
</div>
```

## Colors for interactions

`--color-success`

Used to indicate a successful validation state

```js
<div style={{ color: 'var(--color-success)' }}>{faker.lorem.sentence(5)}</div>
```

Used to indicate an error in validation

`--color-error`

```js
<div style={{ color: 'var(--color-error)' }}>{faker.lorem.sentence(5)}</div>
```
