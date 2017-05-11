jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('../helpers/fix_stdio')

require('app-module-path').addPath(__dirname + '/../..')

const fs = require('fs-extra')
const path = require('path')
const workingdir = require('../helpers/working_dir')
const cmd = require('../helpers/cmd')
const expect = require('chai').expect
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

  it('requires an app path', () => {
    expect(() => clidb(cmd('setupdb'))).to.throw(/specify an app path/)
  })

  it('creates a new database', async () => {
    const dir = await workingdir()
    await newapp()
    const appPath = path.join(dir, 'testapp')
    require('app-module-path').addPath(appPath)

    const dbPath = path.join(appPath, 'api', 'db')

    await new Promise(
      resolve => fs.emptyDir(dbPath, err => {
        if (err) throw err
        resolve()
      })
    )

    await clidb(cmd(`setupdb ${appPath}`, dbanswers))()

    const testfile = path.join(require('../../src/db-path')(appPath), 'CURRENT')
    expect(() => fs.statSync(testfile)).to.not.throw()
  })
})
