jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('../helpers/fix-stdio')
require('../helpers/debug-exit')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const fs = require('fs-extra')
const workingdir = require('../helpers/working-dir')
const cmd = require('../helpers/cmd')
const spawn = require('child-process-promise').spawn

const clidb = require('../../cli/setupdb')

const dbanswers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

const newapp = () => {
  const env = Object.create(process.env)
  env.NODE_ENV = 'production'
  const binpath = path.join(__dirname, '..', '..', 'bin', 'pubsweet-new')
  const newcmd = cmd('new testapp', dbanswers).join(' ').replace(
    ' new ', ` ${binpath} `
  )
  return spawn(
    `${newcmd}`,
    [],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
      env: env
    }
  )
}

describe('CLI: pubsweet setupdb', () => {
  beforeAll(() => { process.env.NODE_ENV = 'production' })
  afterAll(() => { process.env.NODE_ENV = 'test' })

  it('requires an app path', async () => {
    await expect(clidb(cmd('setupdb'))).rejects
      // .toMatch(/specify an app path/)
      .toBeInstanceOf(Error)
  })

  it('creates a new database', async () => {
    const dir = await workingdir()
    await newapp()

    const appPath = path.join(dir, 'testapp')
    require('app-module-path').addPath(appPath)

    const dbPath = path.join(appPath, 'api', 'db')
    await fs.emptyDir(dbPath)

    await clidb(cmd(`setupdb ${appPath}`, dbanswers))

    const testfile = path.join(require('../../src/db-path')(appPath), 'CURRENT')

    await expect(fs.stat(testfile)).resolves.toBeInstanceOf(fs.Stats)
  })
})
