jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('../helpers/fix_stdio')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const fs = require('fs')
const workingdir = require('../helpers/working_dir')
const cmd = require('../helpers/cmd')
const expect = require('chai').expect

const clinew = require('../../cli/new')

const checkfiles = [
  'api',
  'api/db',
  'app',
  'app/components',
  'webpack',
  '.gitignore'
]

const answers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

describe('CLI: pubsweet new', () => {
  it('requires an app name', () => {
    expect(() => clinew(cmd('new'))).to.throw(/specify an app name/)
  })

  it('creates a new app', async () => {
    const dir = await workingdir()
    await clinew(cmd('new testapp', answers))()
    checkfiles.forEach(file => {
      const filepath = path.join(dir, 'testapp', file)
      expect(() => fs.statSync(filepath)).to.not.throw()
    })
  })
})
