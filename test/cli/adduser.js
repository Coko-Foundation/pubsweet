jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('../helpers/fix_stdio')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const workingdir = require('../helpers/working_dir')
const cmd = require('../helpers/cmd')
const chai = require('chai')
chai.use(require('chai-as-promised'))
const expect = chai.expect

const clinew = require('../../cli/new')
const cliusr = require('../../cli/adduser')

const dbanswers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

const useranswers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  admin: false
}

describe('CLI: pubsweet adduser', () => {
  it('requires an app path', () => {
    expect(() => cliusr(cmd('adduser'))).to.throw(/specify an app path/)
  })

  it('adds a user', async () => {
    const dir = await workingdir()
    await clinew(cmd('new testapp', dbanswers))()
    const appPath = path.join(dir, 'testapp')
    require('app-module-path').addPath(appPath)

    const addoneuser = () => cliusr(cmd(`adduser ${appPath}`, useranswers))

    expect(addoneuser()).to.be.fulfilled()
  })
})
