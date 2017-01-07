const fs = require('fs')
const path = require('path')
const api = require('./helpers/api')

function file (name) {
  return fs.createReadStream(path.join(__dirname, 'fixtures', name))
}

it('should upload a file and preserve the extension', () => {
  return api.upload.post(file('fixture.jpg')).then(res => {
    expect(res.statusCode).toBe(200)
    expect(path.extname(res.text)).toBe('.jpg')
  })
})

