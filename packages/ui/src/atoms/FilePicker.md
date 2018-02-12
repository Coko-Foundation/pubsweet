Using an `<Icon>` component.

```js
const Icon = require('./Icon').default
;<FilePicker onUpload={file => console.log('picked -> ', file)}>
  <div style={{ width: 40 }}>
    <Icon size={36}>file-plus</Icon>
  </div>
</FilePicker>
```

Only .PNG files allowed.

```js
<FilePicker
  onUpload={file => console.log('picked -> ', file)}
  allowedFileExtensions={['png']}
>
  <div>Ony PNGs</div>
</FilePicker>
```

Disabled.

```js
<FilePicker onUpload={file => console.log('picked -> ', file)} disabled>
  <div>I'm disabled</div>
</FilePicker>
```
