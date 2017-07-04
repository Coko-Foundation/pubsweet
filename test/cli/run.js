jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('../helpers/fix-stdio')
require('../helpers/debug-exit')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const workingDir = require('../helpers/working-dir')
const cmd = require('../helpers/cmd')
const get = require('simple-get')

const clinew = require('../../cli/new')
const clirun = require('../../cli/run')

const answers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

const expectRunning = child => new Promise(resolve => {
  let tries = 0

  const dotry = () => get('http://localhost:3000', (err, res) => {
    tries++
    if (err && tries < 12) return setTimeout(dotry, 5000)
    expect(err).toBeNull()
    expect(res.statusCode).toBe(200)
    child.stop()
    resolve()
  })

  dotry()
})

const expectStopped = () => new Promise(resolve => {
  setTimeout(() => {
    get('http://localhost:3000', err => {
      expect(err).toBeDefined()
      resolve()
    })
  }, 5000)
})

describe('CLI: pubsweet run', () => {
  it('adds a component', async () => {
    const dir = await workingDir()

    await clinew(cmd('new testapp', answers))

    const appPath = path.join(dir, 'testapp')
    process.chdir(appPath)
    require('app-module-path').addPath(appPath)

    const child = await clirun(cmd('run'))
    await expectRunning(child)
    await expectStopped()
  })
})
