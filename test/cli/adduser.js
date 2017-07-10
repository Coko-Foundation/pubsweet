jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('../helpers/fix-stdio')
require('../helpers/debug-exit')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const workingdir = require('../helpers/working-dir')
const cmd = require('../helpers/cmd')

const clinew = require('../../cli/new')
const cliusr = require('../../cli/adduser')

const dbanswers = {
  username: 'someuser',
  email: 'foo@example.com',
  password: '12345',
  collection: 'entries'
}

const useranswers = {
  username: 'anotheruser',
  email: 'bar@example.com',
  password: '12345',
  admin: false
}

describe('CLI: pubsweet adduser', () => {
  it('requires an app path', async () => {
    await expect(cliusr(cmd('adduser'))).rejects
      // .toMatch(/specify an app path/)
      .toBeInstanceOf(Error)
  })

  it('adds a user', async () => {
    const dir = await workingdir()

    await clinew(cmd('new testapp', dbanswers))

    const appPath = path.join(dir, 'testapp')
    require('app-module-path').addPath(appPath)

    await expect(cliusr(cmd(`adduser ${appPath}`, useranswers))).resolves
      .toBeUndefined()
  })
})
