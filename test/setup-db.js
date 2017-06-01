jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
require('./helpers/fix-stdio')

const fs = require('fs-extra')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const workingdir = require('./helpers/working-dir')
const logger = require('../src/logger')

const appname = 'testapp'

const dbconfig = require('./fixtures').dbconfig

const env = process.env.NODE_ENV = 'production'

describe('setup-db', () => {
  let appdir
  let dbdir
  const dbfiles = env => fs.readdir(path.join(dbdir, env))

  beforeAll(async (done) => {
    try {
      const tmpdir = await workingdir()
      appdir = await fs.mkdirs(path.join(tmpdir, appname))
      dbdir = path.join(appdir, 'api', 'db')
      process.chdir(appdir)
      logger.info('Created directory', appdir)

      await require('../src/generate-env')()

      await require('../src/initial-app')(appname)

      require('../src/load-config')(path.resolve('', './config'))
      logger.info('Config dir is', process.env.NODE_CONFIG_DIR)

      await require('../src/setup-db')({
        properties: require('../src/db-properties'),
        override: dbconfig
      })

      done()
    } catch (e) {
      done.fail(e)
    }
  })

  afterAll(() => {
    process.env.NODE_ENV = 'test'
  })

  it('creates the database', async () => {
    await expect(fs.readdir(dbdir)).resolves.toContain(env)

    const items = await dbfiles(env)

    expect(items).toContain('CURRENT')
    expect(items).toContain('LOG')
    expect(items).toContain('LOCK')
  })

  it('only creates the database for the current NODE_ENV', async () => {
    await expect(dbfiles('dev')).resolves.not.toContain('CURRENT')
  })
})
