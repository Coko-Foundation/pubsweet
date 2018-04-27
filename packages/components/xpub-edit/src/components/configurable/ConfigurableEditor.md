An editor that can be configured simply with boolean props

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
