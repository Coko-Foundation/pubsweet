jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000000

const path = require('path')
const fs = require('fs-extra')
const { runCommand } = require('./helpers/')

const appName = 'testapp'
const tempDir = path.join(__dirname, '..', 'temp')
const appPath = path.join(tempDir, appName)
const dbPath = path.join(appPath, 'api', 'db')

const nodeConfig = {
  'pubsweet-server': {
    dbPath,
    adapter: 'leveldb'
  }
}

/* These tests run "pubsweet" commands as child processes with no mocking */
/* They perform a full installation cycle, including multiple yarn commands */

describe('CLI: integration test', async () => {
  beforeAll(() => {
    fs.emptyDirSync(tempDir)
  })

  afterAll(() => {
    // fs.removeSync(tempDir)
  })

  describe('new', async () => {
    it('will not overwrite non-empty dir', async () => {
      fs.ensureDirSync(path.join(tempDir, 'testapp', 'blocking-dir'))
      const { stderr } = await runCommand({ args: `new ${appName}`, cwd: tempDir, stdio: 'pipe' })
      expect(stderr).toContain(`destination path 'testapp' already exists and is not an empty directory`)
      fs.emptyDirSync(tempDir)
    })

    it('runs git clone <appname> and yarn install', async () => {
      const { stdout, stderr } = await runCommand({ args: `new ${appName}`, cwd: tempDir, stdio: 'pipe' })
      // TODO: add assertion
      console.log('after clone', stdout, stderr)
      expect(1).toEqual(1)
    })
  })

  describe.skip('add and remove', async () => {
    const componentsFile = path.join(appPath, 'config', 'components.json')
    const componentName = 'ink-backend'

    let oldComponents
    beforeAll(async () => {
      oldComponents = fs.readJsonSync(componentsFile)
    })

    it('adds component', async () => {
      const { stdout } = await runCommand({ args: `add ${componentName}`, cwd: appPath, stdio: 'pipe' })
      expect(stdout).toContain('Success: 1 components installed')
      const configPostAdd = fs.readJsonSync(componentsFile)
      expect(configPostAdd).toEqual(oldComponents.concat(`pubsweet-component-${componentName}`))
    })

    it('removes component', async () => {
      const { stdout } = await runCommand({ args: `remove ${componentName}`, cwd: appPath, stdio: 'pipe' })
      expect(stdout).toContain('Success: 1 components removed')
      const configPostRemove = fs.readJsonSync(componentsFile)
      expect(configPostRemove).toEqual(oldComponents)
    })
  })

  describe('setupdb', async () => {
    it('creates a new database', async () => {
      const answers = {
        username: 'someuser',
        email: 'user@test.com',
        password: '12345678',
        collection: 'entries'
      }

      const { stdout, stderr } = await runCommand({
        args: 'setupdb',
        options: answers,
        stdio: 'pipe',
        cwd: appPath,
        nodeConfig
      })
      console.log(stdout, stderr)
      //      expect(stdout).toContain('Finished')
      expect(fs.existsSync(path.join(dbPath, 'test', 'CURRENT'))).toBe(true)
    })
  })

  describe('start', async () => {
    it('starts a server', async () => {
      const { stdout, stderr } = await runCommand({
        args: 'start',
        cwd: appPath,
        stdio: 'pipe',
        nodeConfig
      })
      console.log('after start', stdout, stderr, '=================\n')
    })
  })
})
