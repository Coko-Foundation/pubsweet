jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('app-module-path').addPath(__dirname + '/../..')

const expect = require('chai').expect
const fs = require('fs-extra')
const path = require('path')
const workingdir = require('./helpers/working_dir')

const appname = 'testapp'

const fixtures = require('./fixtures')

describe('add-user', () => {
  let appdir
  let User

  beforeAll(() => workingdir().then(
    tmpdir => {
      appdir = path.join(tmpdir, appname)
      fs.mkdirsSync(appdir)
      process.chdir(appname)

      const backend = require('../src/backend')

      return require('../src/generate-config')().then(
        require('../src/generate-env')
      ).then(
        () => require('../src/initial-app')(appname)
      ).then(
        require('../src/setup-db')({
          properties: require('../src/db-properties'),
          override: fixtures.dbconfig
        })
      ).then(
        () => {
          User = require(`${backend()}/src/models/User`)
        }
      )
    }
  ))

  it('adds a regular user to the database',
    () => require('../src/add-user')({
      properties: require('../src/user-properties'),
      override: fixtures.regularuser
    })().then(
      () => User.all()
    ).then(
      users => {
        let user = users.find(u => u.username === fixtures.regularuser.username)
        expect(user).to.exist
        expect(user.email).to.equal(fixtures.regularuser.email)
        expect(user.admin).to.not.be.ok
      }
    )
  )

  it('adds an admin user to the database',
    () => require('../src/add-user')({
      properties: require('../src/user-properties'),
      override: fixtures.adminuser
    })().then(
      () => User.all()
    ).then(
      users => {
        let user = users.find(u => u.username === fixtures.adminuser.username)
        expect(user).to.exist
        expect(user.email).to.equal(fixtures.adminuser.email)
        expect(user.admin).to.be.ok
      }
    )
  )
})
