const path = require('path')
const fs = require('fs-extra')
const { runCommand } = require('../helpers/')

const appPath = path.join(__dirname, '..', '..', 'node_modules', '@pubsweet', 'starter')
const dbPath = path.join(appPath, 'api', 'db')

describe('CLI: integration test', async () => {
  it.only('new: spawns git clone <appname> and yarn install', async () => {
    const appName = 'testapp'
    const cwd = path.join(__dirname, '..', '..', 'temp')
    fs.ensureDirSync(cwd)
    try {
      const { stdout, stderr } = await runCommand({ args: `new ${appName}`, cwd })
      console.log(stdout, stderr)
    } catch (e) {
      console.log('eeeerrrored', e.stdout, e.stderr)
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
