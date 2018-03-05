A list of uploaded files, a list of uploading files and a button to upload more files.

This is a higher-order component that accepts a component to represent a file and passes `uploaded` to any whose uploads have completed.

```js
const file = () => ({
  name: faker.system.commonFileName(),
  type: faker.system.commonFileType(),
  size: faker.random.number(),
})

const files = [file(), file(), file()]
;<FileUploadList
  files={files}
  buttonText="↑ Choose a file to upload"
  FileComponent={({ file, progress, error, uploaded }) => (
    <div style={{ color: uploaded ? 'black' : 'gray' }}>{file.name}</div>
  )}
  uploadFile={file => new XMLHttpRequest()}
/>
```
