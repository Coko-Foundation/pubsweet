A list of supplementary files, and a button to upload a new file.

```js
const files = [
  {
    name: faker.system.commonFileName(),
    url: faker.internet.url(),
  },
  {
    name: faker.system.commonFileName(),
    url: faker.internet.url(),
  },
]
;<Supplementary files={files} uploadFile={file => new XMLHttpRequest()} />
```
