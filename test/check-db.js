const fs = require('fs-extra')
const path = require('path')
const workingdir = require('./helpers/working-dir')
const checkdb = require('../src/check-db')
const dbPath = require('../src/db-path')

describe.only('check-db', () => {
  let env
  beforeAll(() => {
    env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
  })

  afterAll(() => {
    process.env.NODE_ENV = env
  })

  it('rejects if no db exists', async () => {
    const dir = await workingdir()
    await expect(checkdb(dir)).rejects.toBeInstanceOf(Error)
  })

  it('resolves if db exists', async () => {
    const dir = await workingdir()

    const dbdir = dbPath(dir)
    await fs.mkdirs(dbdir)
    await fs.writeFile(path.join(dbdir, 'CURRENT'), '')

    await expect(checkdb(dir)).resolves.toBeUndefined()
  })
})
