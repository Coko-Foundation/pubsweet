/* global db */

const fs = require('fs-extra')
const path = require('path')
const PouchDB = require('pouchdb')

process.env.ALLOW_CONFIG_MUTATIONS = true
process.env.SUPPRESS_NO_CONFIG_WARNING = true

const basePath = path.join(__dirname, '..', '..', 'api', 'db')
const dbPath = path.join(basePath, 'test')

const nonAdminUser = {
  username: 'nonAdminUsername',
  email: 'nonAdmin@example.com',
  password: 'nonAdmin_password'
}

const adminUser = {
  username: 'adminUsername',
  email: 'admin@example.com',
  password: 'admin_password',
  admin: true
}

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

describe('add-user', () => {
  beforeAll(() => {
    fs.ensureDirSync(basePath)
    const config = require('config')
    config['pubsweet-server'] = baseConfig['pubsweet-server']
    config['dbManager'] = baseConfig['dbManager']
  })

  beforeEach(async () => {
    await new PouchDB(dbPath).destroy()
    const { setupDb } = require('../../src/')
    await setupDb()
  })

  afterEach(async () => {
    // call to models adds global db: see server/src/models/schema :(
    await db.destroy()
  })

  it('adds a non-admin user', async () => {
    const { addUser } = require('../../src/')
    await addUser(nonAdminUser)
    const User = require('pubsweet-server/src/models/User')
    const users = await User.all()
    console.log(users)
    const user = users.find(user => user.username === nonAdminUser.username)
    expect(user).not.toBeNull()
    expect(user.admin).toBeFalsy()
  })

  it('adds an admin user to the database', async () => {
    const { addUser } = require('../../src/')
    await addUser(adminUser)
    const User = require('pubsweet-server/src/models/User')
    const users = await User.all()
    const user = users.find(user => user.username === adminUser.username)
    expect(user).not.toBeNull()
    expect(user.admin).toBe(true)
  })
})
