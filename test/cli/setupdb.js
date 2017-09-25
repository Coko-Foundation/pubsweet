process.env.SUPPRESS_NO_CONFIG_WARNING = true
const fs = require('fs-extra')
const formatOpts = require('../helpers/format-opts')
const spawn = require('child-process-promise').spawn
const config = require('config')
const path = require('path')
const appPath = path.join(require.resolve('@pubsweet/db-manager'), '..', '..')

const dbPath = `${appPath}/test-db`

config['pubsweet-server'] = {
  dbPath,
  adapter: 'leveldb'
}

const answers = {
  username: 'someuser',
  email: 'user@test.com',
  password: '12345',
  collection: 'entries'
}

const runCommand = async (args, options) => {
  const argList = args.split(' ').concat(formatOpts(options))
  return spawn('pubsweet', argList, {
    cwd: appPath,
    stdio: 'inherit'
  })
}
// fs.emptyDirSync(dbPath)
describe('CLI: pubsweet setupdb', () => {
  it('creates a new database', async () => {
    await runCommand('setupdb', answers)
    const testFilePath = path.join(dbPath, 'test', 'CURRENT')

    expect(fs.existsSync(testFilePath)).toBe(true)
  })
})
