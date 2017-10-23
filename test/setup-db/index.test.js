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
  dbManager: {
    username: 'testUsername',
    email: 'test@example.com',
    password: 'test_password',
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
    const { setupDb } = require('../../src/')
    await setupDb()
  })

  afterEach(async () => {
    // call to models adds global db: see server/src/models/schema :(
    await db.destroy()
  })

  it('creates the database', () => {
    const dbDir = fs.readdirSync(basePath)
    expect(dbDir).toContain('test_db')
    const items = fs.readdirSync(dbPath)
    expect(items).toContain('CURRENT')
  })

  it('generates secret in config', () => {
    const fs = require('fs-extra')
    const calls = fs.writeJsonSync.mock.calls
    expect(calls[0][1]['pubsweet-server']).toHaveProperty('secret')
  })
})
