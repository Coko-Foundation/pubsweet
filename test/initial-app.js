jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

require('app-module-path').addPath(__dirname + '/../..')

const generate = require('../src/initial-app')
const workingdir = require('./helpers/working_dir')
const expect = require('chai').expect
const fs = require('fs-extra')
const path = require('path')

const appname = 'testapp'

describe('initial-app', () => {
  let appdir
  beforeAll(() => workingdir().then(
    tmpdir => {
      appdir = path.join(tmpdir, appname)
      fs.mkdirsSync(appdir)
      process.chdir(appname)
      return generate(appname)
    }
  ))

  it('generates package.json',
    () => {
      expect(fs.readdirSync(appdir)).to.include('package.json')
    }
  )

  it('copies the initial app structure across',
    () => {
      expect(fs.readdirSync(appdir)).to.include.members([
        'api', 'app', 'static', 'webpack'
      ])
    }
  )

  it('installs app dependencies',
    () => {
      expect(fs.readdirSync(appdir)).to.include('node_modules')
    }
  )

  it('sets up the git environment',
    () => {
      expect(fs.readdirSync(appdir)).to.include.members([
        '.git', '.gitignore', '.npmignore'
      ])
    }
  )
})
