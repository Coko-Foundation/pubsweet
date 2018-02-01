CSS variables are used to define font families.

`--font-interface`

```js
<div style={{ fontFamily: 'var(--font-interface)' }}>
  {faker.lorem.sentence(5)}
</div>
```

`--font-heading`

```js
<div
  style={{
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--font-size-heading-1)',
  }}
>
  {faker.lorem.sentence(5)}
</div>
```

`--font-reading`

```js
<div style={{ fontFamily: 'var(--font-reading)' }}>
  {faker.lorem.sentence(5)}
</div>
```

`--font-writing`

```js
<div style={{ fontFamily: 'var(--font-writing)' }}>
  {faker.lorem.sentence(5)}
</div>
```
