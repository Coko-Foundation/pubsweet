jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('app-module-path').addPath(__dirname + '/../..')

const expect = require('chai').expect
const fs = require('fs-extra')
const path = require('path')
const workingdir = require('./helpers/working_dir')

const appname = 'testapp'

const dbconfig = require('./fixtures').dbconfig

const env = process.env.NODE_ENV

describe('setup-db', () => {
  let appdir
  let dbdir
  const dbfiles = env => fs.readdirSync(path.join(dbdir, env))

  beforeAll(() => workingdir().then(
    tmpdir => {
      appdir = path.join(tmpdir, appname)
      dbdir = path.join(appdir, 'api', 'db')
      fs.mkdirsSync(appdir)
      process.chdir(appname)

      return require('../src/generate-config')().then(
        require('../src/generate-env')
      ).then(
        () => require('../src/initial-app')(appname)
      ).then(
        require('../src/setup-db')({
          properties: require('../src/db-properties'),
          override: dbconfig
        })
      )
    }
  ))

  // it('creates the database',
  //   () => {
  //     expect(fs.readdirSync(dbdir)).to.include(env)
  //     expect(dbfiles('production')).to.include.members([
  //       'CURRENT',
  //       'LOG',
  //       'LOCK'
  //     ])
  //   }
  // )

  it('only creates the database for the current NODE_ENV',
    () => {
      expect(dbfiles('dev')).to.not.include('CURRENT')
    }
  )
})
