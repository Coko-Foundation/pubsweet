const fs = require('fs')
const path = require('path')
const api = require('./helpers/api')

function fileName (name) {
  return path.join(__dirname, 'fixtures', name)
}

function file (name) {
  return fs.createReadStream(fileName(name))
}

function fileBuffer (name) {
  return fs.readFileSync(fileName(name))
}

it('should upload a file and preserve the extension and serve the file', () => {
  return api.upload.post(file('fixture.jpg')).then(res => {
    expect(res.statusCode).toBe(200)
    expect(path.extname(res.text)).toBe('.jpg')

    return api.upload.get(res.text)
  }).then(res => {
    expect(res.body.equals(fileBuffer('fixture.jpg'))).toBe(true)
  })
})

