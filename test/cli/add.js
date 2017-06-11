jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('../helpers/fix-stdio')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const workingdir = require('../helpers/working-dir')
const cmd = require('../helpers/cmd')

const clinew = require('../../cli/new')
const cliadd = require('../../cli/add')

const answers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

describe('CLI: pubsweet add', () => {
  it('requires a component', async () => {
    await expect(cliadd(cmd('add'))).rejects
      // .toMatch(/specify one or more components/)
      .toBeInstanceOf(Error)
  })

  it('adds a component', async () => {
    const dir = await workingdir()

    await clinew(cmd('new testapp', answers))

    const appPath = path.join(dir, 'testapp')
    process.chdir(appPath)
    require('app-module-path').addPath(appPath)

    await expect(cliadd(cmd('add ink-backend'))).resolves.toBeUndefined()
  })
})
