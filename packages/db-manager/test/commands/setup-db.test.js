const { setupDb } = require('../../src')
const { User } = require('@pubsweet/models')

describe('setup-db', () => {
  it('creates the database and an admin user', async () => {
    await setupDb({
      username: 'admin',
      email: 'admin@example.com',
      password: 'password',
    })
    const [user] = await User.all()
    expect(user).toMatchObject({
      type: 'user',
      username: 'admin',
    })
  })
})
