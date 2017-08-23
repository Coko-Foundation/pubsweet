jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const fs = require('fs-extra')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const workingdir = require('./helpers/working-dir')
const logger = require('pubsweet-logger')

const appname = 'testapp'

const dbconfig = require('./fixtures').dbconfig

describe('setup-db', () => {
  let appdir
  let dbdir

  beforeAll(async (done) => {
    process.env.NODE_ENV = 'production'

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
    await expect(fs.readdir(dbdir)).resolves.toContain('production')

    const items = await fs.readdir(path.join(dbdir, 'production'))

    expect(items).toContain('CURRENT')
    expect(items).toContain('LOG')
    expect(items).toContain('LOCK')
  })

  it('only creates the database for the current NODE_ENV', async () => {
    const items = await fs.readdir(path.join(dbdir, 'dev'))

    expect(items).not.toContain('CURRENT')
  })
})
