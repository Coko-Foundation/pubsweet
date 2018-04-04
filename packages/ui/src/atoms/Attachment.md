A file attached to a note.

By default the file is displayed as uploading

```js
const file = {
  name: faker.system.commonFileName(),
  url: faker.internet.url(),
}
;<Attachment file={file} />
```

When passed the `uploaded` prop, it becomes a link:

```js
const file = {
  name: faker.system.commonFileName(),
  url: faker.internet.url(),
}
;<Attachment file={file} uploaded />
```

When passed the `error` prop, it shows an error:

```js
const file = {
  name: faker.system.commonFileName(),
  url: faker.internet.url(),
}
;<Attachment file={file} error="Upload failed" />
```
