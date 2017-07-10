jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('../helpers/fix-stdio')
require('../helpers/debug-exit')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const fs = require('fs-extra')
const workingdir = require('../helpers/working-dir')
const cmd = require('../helpers/cmd')
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
  it('requires an app name', async () => {
    await expect(clinew(cmd('new'))).rejects
      // .toMatch(/specify an app name/)
      .toBeInstanceOf(Error)
  })

  it('creates a new app', async () => {
    const dir = await workingdir()

    await clinew(cmd('new testapp', answers))

    const promises = checkfiles.map(async file => {
      const filepath = path.join(dir, 'testapp', file)
      await expect(fs.stat(filepath)).resolves.toBeInstanceOf(fs.Stats)
    })

    await expect(Promise.all(promises)).resolves.toEqual(
      expect.arrayContaining([undefined])
    )
  })
})
