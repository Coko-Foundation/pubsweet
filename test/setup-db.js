jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('./helpers/fix_stdio')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const expect = require('chai').expect
const fs = require('fs-extra')
const workingdir = require('./helpers/working_dir')
const logger = require('../src/logger')

const appname = 'testapp'

const dbconfig = require('./fixtures').dbconfig

const env = process.env.NODE_ENV = 'production'

describe('setup-db', () => {
  let appdir
  let dbdir
  const dbfiles = env => fs.readdirSync(path.join(dbdir, env))

  beforeAll(async (done) => {
    const tmpdir = await workingdir()
    appdir = fs.mkdirsSync(path.join(tmpdir, appname))
    dbdir = path.join(appdir, 'api', 'db')
    process.chdir(appdir)
    logger.info('created directory')

    await require('../src/generate-env')()
    logger.info('env generated')

    await require('../src/initial-app')(appname)
    logger.info('app generated')

    require('../src/load-config')(path.resolve('', './config'))
    logger.info('config loaded')

    await require('../src/setup-db')({
      properties: require('../src/db-properties'),
      override: dbconfig
    })
    logger.info('db created')

    done()
  })

  afterAll(() => {
    process.env.NODE_ENV = 'test'
  })

  it('creates the database',
    () => {
      expect(fs.readdirSync(dbdir)).to.include(env)
      expect(dbfiles(env)).to.include.members([
        'CURRENT',
        'LOG',
        'LOCK'
      ])
    }
  )

  it('only creates the database for the current NODE_ENV',
    () => {
      expect(dbfiles('dev')).to.not.include('CURRENT')
    }
  )
})
