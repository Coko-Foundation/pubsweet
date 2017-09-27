jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000000
const path = require('path')
const fs = require('fs-extra')
const { runCommand } = require('./helpers/')

const appPath = path.join(__dirname, '..', 'node_modules', '@pubsweet', 'starter')
const dbPath = path.join(appPath, 'api', 'db')

const appName = 'testapp'
const tempDir = path.join(__dirname, '..', 'temp')

/* These tests run "pubsweet" commands as child processes with no mocking */

describe('CLI: integration test', async () => {
  const componentsFile = path.join(appPath, 'config', 'components.json')
  const pkgFile = path.join(appPath, 'package.json')
  const lockFile = path.join(appPath, 'yarn.lock')
  const oldComponents = fs.readJsonSync(componentsFile)
  const oldPkg = fs.readJsonSync(pkgFile)
  const oldLock = fs.readFileSync(lockFile)

  describe('installation cycle', async () => {
    beforeEach(() => {
      fs.ensureDirSync(tempDir)
    })

    afterEach(() => {
      fs.removeSync(tempDir)
      fs.writeJsonSync(componentsFile, oldComponents, {spaces: '\t'})
      fs.writeFileSync(lockFile, oldLock)
      fs.writeJsonSync(pkgFile, oldPkg, {spaces: '\t'})
    })

    it('new: will not overwrite non-empty dir', async () => {
      expect.hasAssertions()
      fs.ensureDirSync(path.join(tempDir, 'testapp', 'blocking-dir'))
      try {
        await runCommand({ args: `new ${appName}`, cwd: tempDir, stdio: 'pipe' })
      } catch (e) {
        expect(e.stderr).toContain(`destination path 'testapp' already exists and is not an empty directory`)
      }
    })

    // This test is very slow. There is a mocked version in test/cli/new.js
    it.skip('new: runs git clone <appname> and yarn install', async () => {
      expect.hasAssertions()
      const { stdout, stderr } = await runCommand({ args: `new ${appName}`, cwd: tempDir, stdio: 'pipe' })
      // TODO: add assertion
      // requires merge on pubsweet-starter
      console.log(stdout, stderr)
    })

    // This test is very slow. There is a mocked version in test/cli/new.js
    it.skip('add: installs component', async () => {
      const componentName = 'ink-backend'

      const { stdout, stderr } = await runCommand({ args: `add ${componentName}`, cwd: appPath, stdio: 'pipe' })
      expect(stdout).toContain('Success: 1 components installed')
      const configPostAdd = fs.readJsonSync(componentsFile)
      expect(configPostAdd).toEqual(oldComponents.concat(`pubsweet-component-${componentName}`))
    })

    // This test is very slow. There is a mocked version in test/cli/new.js
    it.skip('removes: removes component', async () => {
      const componentName = 'blog'

      const { stdout, stderr } = await runCommand({ args: `remove ${componentName}`, cwd: appPath, stdio: 'pipe' })
      expect(stdout).toContain('Success: 1 components removed')
      const configPostRemove = fs.readJsonSync(componentsFile)
      expect(configPostRemove).toEqual(oldComponents)
    })
  })

  describe('app setup and start', async () => {
    beforeAll(() => {
      fs.removeSync(dbPath)
      fs.ensureDirSync(dbPath)
    })
    
    afterAll(() => {
      fs.removeSync(path.join(appPath, 'config', 'local-test.json'))
      fs.removeSync(path.join(appPath, 'api'))
    })

    it('setupdb: creates a new database', async () => {
      const nodeConfig = {
        'pubsweet-server': {
          dbPath,
          adapter: 'leveldb'
        }
      }

      const answers = {
        username: 'someuser',
        email: 'user@test.com',
        password: '12345678',
        collection: 'entries'
      }

      const { stdout } = await runCommand({
        args: 'setupdb',
        options: answers,
        cwd: appPath,
        nodeConfig
      })

      expect(stdout).toContain('Finished')
      expect(fs.existsSync(path.join(dbPath, 'test', 'CURRENT'))).toBe(true)
    })
  })
})
