jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000
require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const fs = require('fs-extra')
const workingdir = require('./helpers/working-dir')
const logger = require('@pubsweet/logger')

const appname = 'testapp'

const fixtures = require('./fixtures')
const dbconfig = fixtures.dbconfig

describe('add-user', () => {
  let appdir
  let User

  beforeAll(async (done) => {
    try {
      const tmpdir = await workingdir()
      appdir = path.join(tmpdir, appname)
      await fs.mkdirs(appdir)
      process.chdir(appdir)
      logger.info('Created directory')

      await require('../src/generate-env')()

      await require('../src/initial-app')(appname)

      await require('../src/setup-db')({
        properties: require('../src/db-properties'),
        override: dbconfig
      })

      require('../src/load-config')(path.resolve('', './config'))
      logger.info('Config dir is', process.env.NODE_CONFIG_DIR)

      User = require('pubsweet-server/src/models/User')

      done()
    } catch (e) {
      done.fail(e)
    }
  })

  it('adds a regular user to the database', async () => {
    await require('../src/add-user')({
      appPath: appdir,
      properties: require('../src/user-properties'),
      override: fixtures.regularuser
    })

    // const user = await User.findOneByField('username', fixtures.regularuser.username)
    const users = await User.all()
    const user = users.find(user => user.username === fixtures.regularuser.username)

    expect(user).not.toBeNull()
    expect(user.email).toBe(fixtures.regularuser.email)
    expect(user.admin).toBe(false)
  })

  it('adds an admin user to the database', async () => {
    await require('../src/add-user')({
      appPath: appdir,
      properties: require('../src/user-properties'),
      override: fixtures.adminuser
    })

    // const user = await User.findOneByField('username', fixtures.adminuser.username)
    const users = await User.all()
    const user = users.find(user => user.username === fixtures.adminuser.username)

    expect(user).not.toBeNull()
    expect(user.email).toBe(fixtures.adminuser.email)
    expect(user.admin).toBe(true)
  })
})
