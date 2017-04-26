jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('../helpers/fix_stdio')

require('app-module-path').addPath(__dirname + '/../..')

const path = require('path')
const workingdir = require('../helpers/working_dir')
const cmd = require('../helpers/cmd')
const expect = require('chai').expect
const get = require('simple-get')

const clinew = require('../../cli/new')
const clirun = require('../../cli/run')

const answers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

const expectrunning = child => new Promise(
  resolve => setTimeout(
    () => get('http://localhost:3000', (err, res) => {
      expect(err).to.not.exist
      expect(res.statusCode).to.equal(200)
      child.stop()
      resolve()
    }),
    30000
  )
)

const expectstopped = () => new Promise(
  resolve => setTimeout(
    () => get('http://localhost:3000', err => {
      expect(err).to.be.an('error')
      resolve()
    }),
    5000
  )
)

describe('CLI: pubsweet run', () => {
  it('adds a component', async () => {
    const dir = await workingdir()
    await clinew(cmd('new testapp', answers))()
    const appPath = path.join(dir, 'testapp')
    process.chdir(appPath)
    require('app-module-path').addPath(appPath)

    const run = () => clirun(cmd('run'))

    await run().then(
      expectrunning
    ).then(
      expectstopped
    )
  })
})
