import test from 'ava'
import fs from 'fs'
import path from 'path'

import api from '../src/test/helpers/api'

function file (name) {
  return fs.createReadStream(path.join(__dirname, '..', 'src', 'test', 'fixtures', name))
}

test('should upload a file and preserve the extension', t => {
  return api.upload.post(file('fixture.jpg')).then(res => {
    t.is(res.statusCode, 200)
    t.is(path.extname(res.text), '.jpg')
  })
})

