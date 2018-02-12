A list of files attached to a note, and a button to attach a new file.

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
;<Attachments files={files} uploadFile={file => new XMLHttpRequest()} />
```
