jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('./helpers/fix-stdio')
require('./helpers/debug-exit')

const fs = require('fs-extra')

const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '..', '..'))

const logger = require('../src/logger')

const appname = 'testapp'

describe('initial-app', () => {
  let items

  beforeAll(async (done) => {
    try {
      const tmpdir = await require('./helpers/working-dir')()

      const appdir = path.join(tmpdir, appname)
      await fs.mkdirs(appdir)
      process.chdir(appname)
      logger.info('Generated dir', appdir)

      await require('../src/initial-app')(appname)

      items = await fs.readdir(appdir)

      done()
    } catch (e) {
      done.fail(e)
    }
  })

  it('generates package.json', () => {
    expect(items).toContain('package.json')
  })

  it('copies the initial app structure across', () => {
    expect(items).toContain('api')
    expect(items).toContain('app')
    expect(items).toContain('static')
    expect(items).toContain('webpack')
  })

  it('installs app dependencies', () => {
    expect(items).toContain('node_modules')
  })

  it('sets up the git environment', () => {
    expect(items).toContain('.git')
    expect(items).toContain('.gitignore')
  })

  it('renames protected files', () => {
    expect(items).toContain('.gitignore')
    expect(items).toContain('package.json')
  })
})
