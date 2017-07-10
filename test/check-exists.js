require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const checkexists = require('../src/check-exists')
const workingdir = require('./helpers/working-dir')

const fs = require('fs-extra')

describe.only('check-exists', () => {
  it('rejects if no app dir exists', async () => {
    const dir = '/__this_does_not_exist_probably__'
    await expect(checkexists(dir)).rejects.toBeInstanceOf(Error)
  })

  it('resolves if app dir exists', async () => {
    const dir = await workingdir()
    const dbdir = require('../src/db-path')(dir)
    await fs.mkdirs(dbdir)

    await expect(checkexists(dir)).resolves.toBeUndefined()
  })
})
