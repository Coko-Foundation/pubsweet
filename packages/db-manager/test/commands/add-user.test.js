const { model: User } = require('@pubsweet/model-user')
const { addUser, createTables } = require('../../src/')

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

describe('add-user', () => {
  beforeEach(() => createTables(true))

  it('adds a non-admin user', async () => {
    await addUser(nonAdminUser)
    const users = await User.all()
    const user = users.find(user => user.username === nonAdminUser.username)
    expect(user).not.toBeNull()
    expect(user.admin).toBeFalsy()
  })

  it('adds an admin user to the database', async () => {
    await addUser(adminUser)
    const users = await User.all()
    const user = users.find(user => user.username === adminUser.username)
    expect(user).not.toBeNull()
    expect(user.admin).toBe(true)
  })
})
