/* global db */

const fs = require('fs-extra')
const path = require('path')
const PouchDB = require('pouchdb')

process.env.ALLOW_CONFIG_MUTATIONS = true
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const basePath = path.join(__dirname, '..', '..', 'api', 'db')
const dbPath = path.join(basePath, 'test')

const baseConfig = {
  'pubsweet-server': {
    dbPath: basePath,
    adapter: 'leveldb'
  },
  dbManager: {
    user: {
      username: 'testUsername',
      email: 'test@example.com',
      password: 'test_password'
    },
    collection: 'test_collection'
  }
}

describe('setup-db', () => {
  beforeAll(async () => {
    fs.ensureDirSync(basePath)
    const config = require('config')
    config['pubsweet-server'] = baseConfig['pubsweet-server']
    config['dbManager'] = baseConfig['dbManager']
    await new PouchDB(dbPath).destroy()
  })

  beforeEach(async () => {
    const { setupDb } = require('../../src/')
    await setupDb()
  })

  afterEach(async () => {
    // call to models adds global db: see server/src/models/schema :(
    await db.destroy()
  })

  it('creates the database', () => {
    const dbDir = fs.readdirSync(basePath)
    expect(dbDir).toContain('test')
    const items = fs.readdirSync(dbPath)
    expect(items).toContain('CURRENT')
  })

  it('only creates the database for the current NODE_ENV', () => {
    const existsDev = fs.pathExistsSync(path.join(basePath, 'dev'))
    const existsProd = fs.pathExistsSync(path.join(basePath, 'production'))
    expect(existsDev).toBe(false)
    expect(existsProd).toBe(false)
  })
})
