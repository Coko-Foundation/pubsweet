jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000000

const path = require('path')
const fs = require('fs-extra')
const { runCommandSync, runCommandAsync } = require('./helpers/')
const fetch = require('isomorphic-fetch')

const appName = 'testapp'
const dbName = 'test_db'
const tempDir = path.join(__dirname, '..', 'temp')
const appPath = path.join(tempDir, appName)
const dbDir = path.join(appPath, 'api', 'db')
const dbPath = path.join(dbDir, dbName)

const nodeConfig = {
  'pubsweet-server': {
    dbPath,
    adapter: 'leveldb'
  }
}

const dbOptions = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345678'
}

/* These tests run "pubsweet" commands as child processes with no mocking */
/* They perform a full installation cycle, including multiple yarn commands */

describe('CLI: integration test', () => {
  beforeAll(() => {
    fs.ensureDirSync(tempDir)
  })

  afterAll(() => {
    fs.removeSync(tempDir)
  })

  describe('new', () => {
    it('will not overwrite non-empty dir', () => {
      fs.ensureDirSync(path.join(appPath, 'blocking-dir'))
      const { stderr } = runCommandSync({ args: `new ${appName}`, cwd: tempDir, stdio: 'pipe' })
      expect(stderr).toContain(`destination path 'testapp' already exists and is not an empty directory`)
      fs.emptyDirSync(tempDir)
    })

    it('runs git clone <appname> and yarn install', () => {
      runCommandSync({ args: `new ${appName}`, cwd: tempDir, stdio: 'inherit' })
      expect(fs.existsSync(path.join(appPath, 'node_modules'))).toBe(true)
    })
  })

  describe('add and remove', () => {
    const componentsFile = path.join(appPath, 'config', 'components.json')
    const componentName = 'ink-backend'

    let oldComponents
    beforeAll(() => {
      oldComponents = fs.readJsonSync(componentsFile)
    })

    it('adds component', () => {
      const { stdout, stderr } = runCommandSync({ args: `add ${componentName}`, cwd: appPath, stdio: 'pipe' })
      console.log(stdout, stderr)
      expect(stdout).toContain('Success: 1 components installed')
      const configPostAdd = fs.readJsonSync(componentsFile)
      expect(configPostAdd).toEqual(oldComponents.concat(`pubsweet-component-${componentName}`))
    })

    it('removes component', () => {
      const { stdout, stderr } = runCommandSync({ args: `remove ${componentName}`, cwd: appPath, stdio: 'pipe' })
      console.log(stdout, stderr)
      expect(stdout).toContain('Success: 1 components removed')
      const configPostRemove = fs.readJsonSync(componentsFile)
      expect(configPostRemove).toEqual(oldComponents)
    })
  })

  describe('setupdb', () => {
    it('creates a new database', () => {
      fs.ensureDirSync(dbDir)

      const { stdout, stderr } = runCommandSync({
        args: 'setupdb',
        options: dbOptions,
        stdio: 'pipe',
        cwd: appPath,
        nodeConfig
      })

      console.log(stdout, stderr)
      expect(stdout).toContain('Finished')
      expect(fs.existsSync(path.join(dbPath, 'CURRENT'))).toBe(true)
      fs.removeSync(dbDir)
    })
  })

  describe('build', () => {
    const buildDir = path.join(appPath, '_build')

    it('outputs static assets to _build directory', () => {
      runCommandSync({
        args: 'build',
        stdio: 'inherit',
        cwd: appPath,
        nodeConfig
      })

      expect(fs.existsSync(path.join(buildDir, 'assets', 'app.js'))).toBe(true)
      fs.removeSync(buildDir)
    })
  })

  describe('start', () => {
    it('starts an app', (done) => {
      fs.ensureDirSync(dbDir)

      runCommandSync({
        args: 'setupdb',
        options: dbOptions,
        stdio: 'inherit',
        cwd: appPath,
        nodeConfig
      })

      const app = runCommandAsync({
        args: 'start',
        cwd: appPath,
        stdio: 'pipe',
        nodeConfig
      })

      app.stdout.on('data', async data => {
        console.log(data.toString())
        if (data.toString().includes('App is listening')) {
          const result = await fetch('http://localhost:3000')
          expect(result.status).toBe(200)
          done()
        }
      })
    })
  })
})
