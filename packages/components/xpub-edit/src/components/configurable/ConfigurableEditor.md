An editor whose features can be configured with boolean props

```js
const value = faker.lorem.sentence(20)
;<ConfigurableEditor
  value={value}
  title="Simple text input"
  placeholder="Enter something…"
  onBlur={value => console.log(value)}
  onChange={value => console.log(value)}
  bold
  italic
  link
/>
```

With custom menu icons

```js
const value = faker.lorem.sentence(20)
;<ConfigurableEditor
  value={value}
  title="Simple text input"
  placeholder="Enter something…"
  onBlur={value => console.log(value)}
  onChange={value => console.log(value)}
  bold={{ icon: <b>Boldly go</b> }}
  italic
/>
```
