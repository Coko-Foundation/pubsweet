jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000
require('./helpers/fix-stdio')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const fs = require('fs-extra')
const workingdir = require('./helpers/working-dir')
const logger = require('../src/logger')

const appname = 'testapp'

const fixtures = require('./fixtures')
const dbconfig = fixtures.dbconfig

const flow = require('./helpers/flow')
const pubsweet = require('./helpers/pubsweet')

describe('start', () => {
  let server

  beforeAll(async (done) => {
    try {
      const tmpdir = await workingdir()
      const appdir = await fs.mkdirs(path.join(tmpdir, appname))
      process.chdir(appdir)
      logger.info('Created directory', appdir)

      await require('../src/generate-env')()

      await require('../src/initial-app')(appname)

      await require('../src/setup-db')({
        properties: require('../src/db-properties'),
        override: dbconfig
      })

      require('../src/load-config')(path.resolve('', './config'))
      logger.info('Config dir is', process.env.NODE_CONFIG_DIR)

      logger.info('Starting server')
      require('../src/start')(_server => {
        server = _server
        logger.info('Server started')
        done()
      })
    } catch (e) {
      done.fail(e)
    }
  })

  afterAll(done => {
    logger.info('stopping the server')
    server.close(() => {
      logger.info('Server stopped')
      done()
    })
  })

  // FLOW:
  // - start the app
  // - visit the login page
  // - login as the admin user
  // - visit the homepage

  it('should allow admin to log in', async () => {
    const promise = flow()
      .use(pubsweet.login(dbconfig))
      .waitForUrl(/manage.posts/)
      .wait('nav')
      .evaluate(() => document.querySelector('h2').innerText)
      .end()

    await expect(promise).resolves.toBe(dbconfig.collection)
  })
})
