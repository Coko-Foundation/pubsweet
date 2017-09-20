'use strict'

const fs = require('fs-extra')
const path = require('path')
const PouchDB = require('pouchdb')

process.env.ALLOW_CONFIG_MUTATIONS = true
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const basePath = path.join(__dirname, '..', '..', 'api', 'db')

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
    const dbPath = require('../../src/helpers/db-path')
    await new PouchDB(dbPath).destroy()
  })

  beforeEach(async () => {
    const { setupDb } = require('../../src/')
    // call to models adds global db: see server/src/models/schema :(
    await setupDb()
  })

  afterEach(async () => {
    const dbPath = require('../../src/helpers/db-path')
    await new PouchDB(dbPath).destroy()
  })

  it.only('creates the database', () => {
    expect(fs.readdirSync(basePath)).toContain('test')

    const items = fs.readdirSync(path.join(basePath, 'test'))

    expect(items).toContain('CURRENT')
    expect(items).toContain('LOG')
    expect(items).toContain('LOCK')
  })

  it('only creates the database for the current NODE_ENV', () => {
    const exists = fs.pathExistsSync(path.join(basePath, 'dev'))
    expect(exists).toBe(false)
  })
})
