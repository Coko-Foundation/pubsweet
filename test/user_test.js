const dbCleaner = require('./helpers/db_cleaner')
const User = require('../src/models/User')

const fixtures = require('./fixtures/fixtures')
const userFixture = fixtures.user

describe('User', function () {
  beforeEach(function () {
    return dbCleaner()
  })

  it('validates passwords correctly after saving to db', async function (done) {
    const user = new User(userFixture)

    await user.save()

    const savedUser = await User.findByUsername(user.username)

    try {
      expect(typeof savedUser).toBe('object')
    } catch (e) {
      done.fail(e)
    }

    const shouldBeValid = await savedUser.validPassword(userFixture.password)

    try {
      expect(shouldBeValid).toEqual(true)
    } catch (e) {
      done.fail(e)
    }

    const shouldBeInvalid = await savedUser.validPassword('wrongpassword')

    try {
      expect(shouldBeInvalid).toEqual(false)
    } catch (e) {
      done.fail(e)
    }

    done()
  })

  it('raises an error if trying to save a non-unique user', async (done) => {
    const user = new User(userFixture)

    await user.save()

    var duplicateUser = new User(userFixture)

    try {
      await duplicateUser.save()
      done.fail('Duplicate user should not save')
    } catch (err) {
      expect(err.name).toEqual('ConflictError')
    }

    done()
  })

  it('uses custom JSON serialization', async (done) => {
    try {
      const user = new User(userFixture)
      await user.save()

      const savedUser = await User.findByUsername(user.username)
      expect(savedUser).toHaveProperty('username', user.username)
      expect(savedUser).toHaveProperty('passwordHash')

      const stringifiedUser = JSON.parse(JSON.stringify(savedUser))
      expect(stringifiedUser).toHaveProperty('username', user.username)
      expect(stringifiedUser).not.toHaveProperty('passwordHash')

      done()
    } catch (e) {
      done.fail(e)
    }
  })

  it('uses custom JSON serialization in an array', async (done) => {
    try {
      const users = [
        {username: 'user1', email: 'user-1@example.com', password: 'foo1'},
        {username: 'user2', email: 'user-2@example.com', password: 'foo2'},
        {username: 'user3', email: 'user-3@example.com', password: 'foo3'}
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

      done()
    } catch (e) {
      done.fail(e)
    }
  })

  it('finds a list of users', async () => {
    const users = [
      { username: 'user1', email: 'user-1@example.com', password: 'foo1', admin: true },
      { username: 'user2', email: 'user-2@example.com', password: 'foo2' },
      { username: 'user3', email: 'user-3@example.com', password: 'foo3' }
    ]

    await Promise.all(users.map(user => new User(user).save()))

    const items = await User.findByField('admin', true)

    expect(items).toHaveLength(1)
    expect(items[0]).toBeInstanceOf(User)
  })

  it('finds a single user by field', async () => {
    const users = [
      { username: 'user1', email: 'user-1@example.com', password: 'foo1', admin: true },
      { username: 'user2', email: 'user-2@example.com', password: 'foo2' },
      { username: 'user3', email: 'user-3@example.com', password: 'foo3' }
    ]

    await Promise.all(users.map(user => new User(user).save()))

    const item = await User.findOneByField('admin', true)

    expect(item).toBeInstanceOf(User)

    expect(item).toEqual(expect.objectContaining({
      username: 'user1',
      email: 'user-1@example.com',
      admin: true
    }))
  })
})
