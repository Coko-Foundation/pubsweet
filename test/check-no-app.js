require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const checknoapp = require('../src/check-no-app')
const workingdir = require('./helpers/working-dir')
const fs = require('fs-extra')
const path = require('path')

describe.only('check-no-app', () => {
  it('rejects if app exists', async () => {
    const dir = await workingdir()
    await fs.writeFile(path.join(dir, 'file'), '')

    await expect(checknoapp({appPath: dir})).rejects
      .toBeInstanceOf(Error)
  })

  it('resolves if no app exists', async () => {
    const dir = '/__this_does_not_exist_probably__'
    await checknoapp({appPath: dir})
  })

  it('resolves if clobber + app exists', async () => {
    const dir = await workingdir()
    await checknoapp({appPath: dir, override: { clobber: true }})
  })
})
