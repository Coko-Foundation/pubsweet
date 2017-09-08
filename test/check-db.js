jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const logger = require('@pubsweet/logger')

const path = require('path')
const fs = require('fs-extra')
const workingdir = require('./helpers/working-dir')
const checkdb = require('../src/check-db')
const dbPath = require('../src/db-path')

const fixtures = require('./fixtures')
const dbconfig = fixtures.dbconfig

const appname = 'testapp'

describe.only('check-db', () => {
  let env

  // temporarily set NODE_ENV to "production" so that checkdb runs
  beforeAll(() => {
    env = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    logger.info('NODE_ENV is', process.env.NODE_ENV)
  })

  afterAll(() => {
    process.env.NODE_ENV = env
    logger.info('NODE_ENV is', process.env.NODE_ENV)
  })

  it('rejects if no db exists', async () => {
    const dir = await workingdir()
    const result = checkdb(dir)

    return expect(result).rejects.toBeInstanceOf(Error)
  })

  it('resolves if db exists', async () => {
    const tmpdir = await workingdir()
    const appdir = await fs.mkdirs(path.join(tmpdir, appname))

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

    const dbdir = await dbPath(appdir)
    logger.info('Checking DBpath', dbdir, 'for appdir', appdir)

    const result = checkdb(dbdir)

    expect(result).resolves.toBeUndefined()
  })
})
