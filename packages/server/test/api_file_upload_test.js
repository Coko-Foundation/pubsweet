const fs = require('fs')
const path = require('path')
const api = require('./helpers/api')
const cleanDB = require('./helpers/db_cleaner')
const { model: User } = require('@pubsweet/model-user')
const { fixtures } = require('@pubsweet/model-user/test')
const authentication = require('../src/authentication')

function fileName(name) {
  return path.join(__dirname, 'fixtures', name)
}

function file(name) {
  return fs.createReadStream(fileName(name))
}

function fileBuffer(name) {
  return fs.readFileSync(fileName(name))
}

describe('File upload/download', () => {
  let token

  beforeEach(async () => {
    await cleanDB()
    const user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('should upload a file and preserve the extension and serve the file (if authenticated)', async () => {
    const res = await api.upload.post(file('fixture.jpg'), token)
    expect(res.statusCode).toBe(200)
    expect(path.extname(res.text)).toBe('.jpg')

    const download = await api.upload.get(res.text)
    expect(download.body.equals(fileBuffer('fixture.jpg'))).toBe(true)
  })

  it('should serve a 404 if the file does not exist', async () => {
    const res = await api.upload.get('/uploads/nofilehere')

    expect(res.statusCode).toBe(404)
  })
})
