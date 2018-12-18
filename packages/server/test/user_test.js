const dbCleaner = require('./helpers/db_cleaner')
const { model: User } = require('@pubsweet/model-user')

const fixtures = require('./fixtures/fixtures')

const userFixture = fixtures.user

describe('User', () => {
  beforeEach(dbCleaner)

  it('validates passwords correctly after saving to db', async () => {
    const user = new User(userFixture)
    await user.save()

    const savedUser = await User.findByUsername(user.username)
    expect(typeof savedUser).toBe('object')

    const shouldBeValid = await savedUser.validPassword(userFixture.password)
    expect(shouldBeValid).toEqual(true)

    const shouldBeInvalid = await savedUser.validPassword('wrongpassword')
    expect(shouldBeInvalid).toEqual(false)
  })

  it('raises an error if trying to save a user with a non-unique username', async () => {
    const user = new User(userFixture)
    const otherUserFixture = fixtures.otherUser
    otherUserFixture.username = userFixture.username
    const duplicateUser = new User(otherUserFixture)

    await user.save()

    try {
      await duplicateUser.save()
    } catch (err) {
      expect(err.name).toEqual('ConflictError')
    }

    expect.hasAssertions()
  })

  it('raises an error if trying to save a user with a non-unique email', async () => {
    const user = new User(userFixture)
    const otherUserFixture = fixtures.otherUser
    otherUserFixture.email = userFixture.email
    const duplicateUser = new User(otherUserFixture)

    await user.save()

    try {
      await duplicateUser.save()
    } catch (err) {
      expect(err.name).toEqual('ConflictError')
    }

    expect.hasAssertions()
  })

  it('uses custom JSON serialization', async () => {
    const user = new User(userFixture)
    await user.save()

    const savedUser = await User.findByUsername(user.username)
    expect(savedUser).toHaveProperty('username', user.username)
    expect(savedUser).toHaveProperty('passwordHash')

    const stringifiedUser = JSON.parse(JSON.stringify(savedUser))
    expect(stringifiedUser).toHaveProperty('username', user.username)
    expect(stringifiedUser).not.toHaveProperty('passwordHash')
  })

  it('uses custom JSON serialization in an array', async () => {
    const users = [
      { username: 'user1', email: 'user-1@example.com', password: 'foo1' },
      { username: 'user2', email: 'user-2@example.com', password: 'foo2' },
      { username: 'user3', email: 'user-3@example.com', password: 'foo3' },
    ]

    await Promise.all(users.map(user => new User(user).save()))

    const savedUsers = await User.all()

    const savedUser = savedUsers[2]
    expect(savedUser).toHaveProperty('username')
    expect(savedUser).toHaveProperty('passwordHash')

    const stringifiedUsers = JSON.parse(JSON.stringify(savedUsers))
    const stringifiedUser = stringifiedUsers[2]

    expect(stringifiedUser).toHaveProperty('username', savedUser.username)
    expect(stringifiedUser).not.toHaveProperty('passwordHash')
  })

  it('finds a list of users', async () => {
    const users = [
      {
        username: 'user1',
        email: 'user-1@example.com',
        password: 'foo1',
        admin: true,
      },
      { username: 'user2', email: 'user-2@example.com', password: 'foo2' },
      { username: 'user3', email: 'user-3@example.com', password: 'foo3' },
    ]

    await Promise.all(users.map(user => new User(user).save()))

    const items = await User.findByField('admin', true)

    expect(items).toHaveLength(1)
    expect(items[0]).toBeInstanceOf(User)
  })

  it('finds a single user by field', async () => {
    const users = [
      {
        username: 'user1',
        email: 'user-1@example.com',
        password: 'foo1',
        admin: true,
      },
      { username: 'user2', email: 'user-2@example.com', password: 'foo2' },
      { username: 'user3', email: 'user-3@example.com', password: 'foo3' },
    ]

    await Promise.all(users.map(user => new User(user).save()))

    const item = await User.findOneByField('admin', true)

    expect(item).toBeInstanceOf(User)

    expect(item).toEqual(
      expect.objectContaining({
        username: 'user1',
        email: 'user-1@example.com',
        admin: true,
      }),
    )
  })
})
