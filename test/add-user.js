jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('./helpers/fix_stdio')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const fs = require('fs-extra')
const workingdir = require('./helpers/working_dir')
const logger = require('../src/logger')

const appname = 'testapp'

const fixtures = require('./fixtures')
const dbconfig = fixtures.dbconfig

describe('add-user', () => {
  let appdir
  let User

  beforeAll(async (done) => {
    const tmpdir = await workingdir()
    appdir = path.join(tmpdir, appname)
    fs.mkdirsSync(appdir)
    process.chdir(appdir)
    logger.info('Created directory')

    await require('../src/generate-env')()
    logger.info('Env generated')

    await require('../src/initial-app')(appname)
    logger.info('App generated')

    await require('../src/setup-db')({
      properties: require('../src/db-properties'),
      override: dbconfig
    })
    logger.info('DB created')

    require('../src/load-config')(path.resolve('', './config'))
    logger.info('Config loaded')

    const serverpath = require('../src/server-path')
    User = require(`${serverpath()}/src/models/User`)

    done()
  })

  it('adds a regular user to the database',
    () => require('../src/add-user')({
      appPath: appdir,
      properties: require('../src/user-properties'),
      override: fixtures.regularuser
    }).then(
      () => User.all()
    ).then(
      users => {
        let user = users.find(u => u.username === fixtures.regularuser.username)
        expect(user).not.toBeNull()
        expect(user.email).toBe(fixtures.regularuser.email)
        expect(user.admin).toBe(true)
      }
    )
  )

  it('adds an admin user to the database',
    () => require('../src/add-user')({
      appPath: appdir,
      properties: require('../src/user-properties'),
      override: fixtures.adminuser
    }).then(
      () => User.all()
    ).then(
      users => {
        let user = users.find(u => u.username === fixtures.adminuser.username)
        expect(user).not.toBeNull()
        expect(user.email).toBe(fixtures.adminuser.email)
        expect(user.admin).toBe(true)
      }
    )
  )
})
