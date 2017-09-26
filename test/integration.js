jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000000
const { runCommand } = require('./helpers/')
const path = require('path')
const fs = require('fs-extra')

const appPath = path.join(__dirname, '..', '..', 'node_modules', '@pubsweet', 'starter')
const dbPath = path.join(appPath, 'api', 'db')

const appName = 'testapp'
const cwd = path.join(__dirname, '..', 'temp')

/* These tests run "pubsweet" commands as child processes with no mocking */

describe('CLI: integration test', async () => {
  it('new: will not overwrite non-empty dir', async () => {
    expect.hasAssertions()
    fs.ensureDirSync(path.join(cwd, 'testapp', 'blocking-dir'))
    try {
      await runCommand({ args: `new ${appName}`, cwd, stdio: 'pipe' })
    } catch (e) {
      expect(e.stderr).toContain(`destination path 'testapp' already exists and is not an empty directory`)
    }
    fs.removeSync(cwd)
  })

  // This test is very slow. There is a mocked version in test/cli/new.js
  it.skip('new: runs git clone <appname> and yarn install', async () => {
    // expect.hasAssertions()
    const appName = 'testapp'
    fs.ensureDirSync(cwd)
    try {
      const { stdout, stderr } = await runCommand({ args: `new ${appName}`, cwd, stdio: 'pipe' })
      // requires merge on pubsweet-starter
      console.log(stdout, stderr)
    } catch (e) {
    }
    fs.removeSync(cwd)
  })

  it('setupdb: creates a new database', async () => {
    fs.removeSync(dbPath)
    fs.ensureDirSync(dbPath)

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

    const testFilePath = path.join(dbPath, 'test', 'CURRENT')
    expect(fs.existsSync(testFilePath)).toBe(true)

    fs.removeSync(path.join(appPath, 'config', 'local-test.json'))
    fs.removeSync(path.join(appPath, 'api'))
  })
})
