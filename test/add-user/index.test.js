/* global db */

const fs = require('fs-extra')
const _ = require('lodash/fp')
const path = require('path')
const PouchDB = require('pouchdb')

process.env.ALLOW_CONFIG_MUTATIONS = true
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const basePath = path.join(__dirname, '..', '..', 'api', 'db')
const dbPath = path.join(basePath, 'test')

const nonAdminUser = {
  username: 'testUsername',
  email: 'test@example.com',
  password: 'test_password'
}

const adminUser = {
  username: 'adminUsername',
  email: 'admin@example.com',
  password: 'admin_password'
}

const baseConfig = {
  'pubsweet-server': {
    dbPath: basePath,
    adapter: 'leveldb'
  },
  dbManager: {
    user: nonAdminUser,
    collection: 'test_collection'
  }
}

const adminConfig = _.merge(baseConfig, { dbManager: { user: adminUser } })

describe('add-user', () => {
  beforeAll(async () => {
    fs.ensureDirSync(basePath)
  })

  beforeEach(async () => {
    jest.resetModules()
    const config = require('config')
    config['pubsweet-server'] = baseConfig['pubsweet-server']
    config['dbManager'] = baseConfig['dbManager']
    await new PouchDB(dbPath).destroy()
  })

  afterEach(async () => {
    // call to models adds global db: see server/src/models/schema :(
    await db.destroy()
  })

  it('adds a non-admin user', async () => {
    jest.resetModules()
    const config = require('config')
    config['pubsweet-server'] = baseConfig['pubsweet-server']
    config['dbManager'] = baseConfig['dbManager']
    const { setupDb } = require('../../src/')
    await setupDb()
    const User = require('pubsweet-server/src/models/User')
    const users = await User.all()
    const user = users.find(user => user.username === baseConfig.user.username)
    expect(user).not.toBeNull()
    expect(user.admin).toBe(false)
  })

  it('adds an admin user to the database', async () => {
    jest.resetModules()
    const config = require('config')
    config['pubsweet-server'] = adminConfig['pubsweet-server']
    config['dbManager'] = adminConfig['dbManager']
    const { setupDb } = require('../../src/')
    await setupDb()
    const User = require('pubsweet-server/src/models/User')
    const users = await User.all()
    const user = users.find(user => user.username === adminUser.user.username)
    expect(user).not.toBeNull()
    expect(user.admin).toBe(true)
  })
})
