Load and display a fragment

```js
const getCollections = () => new Promise(() => null)
const fragment = {
  presentation: '<h2>This is a title</h2><p>This is some text</p>',
}

;<HTML id="123" fragment={fragment} actions={{ getCollections }} />
```