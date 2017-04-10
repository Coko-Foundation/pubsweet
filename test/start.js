jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000
require('./helpers/fix_stdio')

require('app-module-path').addPath(__dirname + '/../..')

const fs = require('fs-extra')
const path = require('path')
const workingdir = require('./helpers/working_dir')
const logger = require('../src/logger')

const appname = 'testapp'

const fixtures = require('./fixtures')
const dbconfig = fixtures.dbconfig

const flow = require('./helpers/flow')
const pubsweet = require('./helpers/pubsweet')

describe('start', () => {
  let server

  beforeAll(async (done) => {
    const tmpdir = await workingdir()
    const appdir = fs.mkdirsSync(path.join(tmpdir, appname))
    process.chdir(appdir)
    logger.info('created directory')

    await require('../src/generate-config')()
    logger.info('config generated')

    await require('../src/generate-env')()
    logger.info('env generated')

    await require('../src/initial-app')(appname)
    logger.info('app generated')

    await require('../src/setup-db')({
      properties: require('../src/db-properties'),
      override: dbconfig
    })
    logger.info('db created')

    require('../src/load-config')(path.resolve('', './config'))
    logger.info('config loaded')

    logger.info('starting server')
    require('../src/start')(_server => {
      server = _server
      logger.info('server started')
      done()
    })
  })

  afterAll(done => {
    logger.info('stopping the server')
    server.close(() => {
      logger.info('server stopped')
      done()
    })
  })

  // FLOW:
  // - start the app
  // - visit the login page
  // - login as the admin user
  // - visit the homepage

  // call `done`/`done.fail` when complete
  it('should allow admin to log in', done => {
    return flow()
      .use(pubsweet.login(dbconfig))
      .waitForUrl(/manage.posts/)
      .wait('nav')
      .evaluate(() => document.querySelector('h2').innerText)
      .end()
      .then(text => {
        try {
          expect(text).toBe(dbconfig.collection)
          done()
        } catch (e) {
          done.fail()
        }
      })
  })

  // return a promise
  // it('should allow admin to log in', () => {
  //   return flow()
  //     .use(pubsweet.login(dbconfig))
  //     .waitForUrl(/manage.posts/)
  //     .wait('nav')
  //     .evaluate(() => document.querySelector('h2').innerText)
  //     .end()
  //     .then(text => {
  //       expect(text).toBe(dbconfig.collection)
  //     })
  // })

  // NOTE: disabled due to https://github.com/facebook/jest/issues/2059
  // it('should allow admin to log in', async () => {
  //   const text = await flow()
  //     .use(pubsweet.login(dbconfig))
  //     .waitForUrl(/manage.posts/)
  //     .wait('nav')
  //     .evaluate(() => document.querySelector('h2').innerText)
  //     .end()
  //
  //   await expect(text).toBe(dbconfig.collection)
  // })

  // NOTE: use `resolves`, which requires Jest >= v20
  // it('should allow admin to log in', () => {
  //   const promise = flow()
  //     .use(pubsweet.login(dbconfig))
  //     .waitForUrl(/manage.posts/)
  //     .wait('nav')
  //     .evaluate(() => document.querySelector('h2').innerText)
  //     .end()
  //
  //   return expect(promise).resolves.toBe(dbconfig.collection)
  // })
})
