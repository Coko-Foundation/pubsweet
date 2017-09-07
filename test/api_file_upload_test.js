const fs = require('fs')
const path = require('path')
const api = require('./helpers/api')
const fixtures = require('./fixtures/fixtures')
const cleanDB = require('./helpers/db_cleaner')
const User = require('../src/models/User')

function fileName (name) {
  return path.join(__dirname, 'fixtures', name)
}

function file (name) {
  return fs.createReadStream(fileName(name))
}

function fileBuffer (name) {
  return fs.readFileSync(fileName(name))
}

const authenticateUser = () => {
  return api.users.authenticate.post(fixtures.user)
}

describe('File upload/download', () => {
  beforeEach(async () => {
    await cleanDB()
    await new User(fixtures.user).save()
  })

  it('should upload a file and preserve the extension and serve the file (if authenticated)', async () => {
    const userToken = await authenticateUser()

    const res = await api.upload.post(file('fixture.jpg'), userToken)
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
