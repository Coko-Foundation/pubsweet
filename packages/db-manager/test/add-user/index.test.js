const nonAdminUser = {
  username: 'nonAdminUsername',
  email: 'nonAdmin@example.com',
  password: 'nonAdmin_password',
}

const adminUser = {
  username: 'adminUsername',
  email: 'admin@example.com',
  password: 'admin_password',
  admin: true,
}

const baseConfig = {
  dbManager: {
    username: 'testUsername',
    email: 'test@example.com',
    password: 'test_password',
  },
}

describe('add-user', () => {
  beforeEach(async () => {
    // need to reset modules to get fresh db because models hold a reference
    jest.resetModules()
    const config = require('config')
    config.dbManager = baseConfig.dbManager
    const { setupDb } = require('../../src/')
    await setupDb()
  })

  it('adds a non-admin user', async () => {
    const { addUser } = require('../../src/')
    await addUser(nonAdminUser)
    const User = require('pubsweet-server/src/models/User')
    const users = await User.all()
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
