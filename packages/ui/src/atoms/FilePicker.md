Using an `<Icon>` component.

```js
const Icon = require('./Icon').default
;<FilePicker onUpload={file => console.log('picked -> ', file)}>
  <Icon size={4} aria-label="Select a file">
    file-plus
  </Icon>
</FilePicker>
```

Only .PNG files allowed.

```js
;<FilePicker
  onUpload={file => console.log('picked -> ', file)}
  allowedFileExtensions={['png']}
>
  <div>Select some PNGs</div>
</FilePicker>
```

Disabled.

```js
;<FilePicker onUpload={file => console.log('picked -> ', file)} disabled>
  <div>I'm disabled</div>
</FilePicker>
```
