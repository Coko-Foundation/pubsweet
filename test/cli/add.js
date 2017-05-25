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
const cliadd = require('../../cli/add')

const answers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

describe('CLI: pubsweet add', () => {
  it('requires a component', () => {
    expect(() => cliadd(cmd('add'))).to.throw(/specify one or more components/)
  })

  it('adds a component', async () => {
    const dir = await workingdir()
    await clinew(cmd('new testapp', answers))
    const appPath = path.join(dir, 'testapp')
    process.chdir(appPath)
    require('app-module-path').addPath(appPath)

    const addbackend = () => cliadd(cmd('add ink-backend'))

    expect(addbackend()).to.be.fulfilled()
  })
})
