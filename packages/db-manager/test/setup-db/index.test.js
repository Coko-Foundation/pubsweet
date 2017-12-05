/* global db */
jest.mock('fs-extra', () => {
  const fs = require.requireActual('fs-extra')
  fs.writeJsonSync = jest.fn()
  return fs
})

const fs = require('fs-extra')
const _ = require('lodash')
const path = require('path')
const PouchDB = require('pouchdb')

const basePath = path.join(__dirname, '..', '..', 'api', 'db')
const dbPath = path.join(basePath, 'test_db')

const dbConfig = {
  'pubsweet-server': {
    dbPath,
    adapter: 'leveldb',
  },
}

describe('setup-db', () => {
  beforeAll(async () => {
    fs.ensureDirSync(basePath)
    await new PouchDB(dbPath).destroy()
  })

  beforeEach(async () => {
    jest.resetModules() // necessary because db must be recreated after destroyed
    const config = require('config')
    _.merge(config, dbConfig)
  })

  // call to models adds global db: see server/src/models/schema :(
  afterEach(() => db.destroy())

  it('creates the database', async () => {
    const { setupDb } = require('../../src')
    await setupDb()
    const dbDir = fs.readdirSync(basePath)
    expect(dbDir).toContain('test_db')
    const items = fs.readdirSync(dbPath)
    expect(items).toContain('CURRENT')
  })

  it('generates secret in config if not set', async () => {
    const config = require('config')
    config['pubsweet-server'].secret = null
    const { setupDb } = require('../../src')
    await setupDb()
    const fs = require('fs-extra')
    expect(fs.writeJsonSync).toHaveBeenCalled()
    expect(fs.writeJsonSync.mock.calls[0][1]['pubsweet-server']).toHaveProperty(
      'secret',
    )
  })

  it('does not regenerate secret if already set', async () => {
    const fs = require('fs-extra')
    const { setupDb } = require('../../src')
    await setupDb()
    expect(fs.writeJsonSync).not.toHaveBeenCalled()
  })
})
