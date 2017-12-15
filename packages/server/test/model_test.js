const createDb = require('../src/db')
const STATUS = require('http-status-codes')

const Model = require('../src/models/Model')
const User = require('../src/models/User')
const Fragment = require('../src/models/Fragment')
const Collection = require('../src/models/Collection')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

describe('Model', () => {
  let user
  let otherUser

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    otherUser = await new User(fixtures.updatedUser).save()
  })

  it('raises an error if trying to find on a destroyed database', () => {
    expect.hasAssertions()
    return global.db
      .destroy()
      .then(() => Model.findByField('field', 'value'))
      .catch(err => {
        expect(err.name).toEqual('Error')
      })
      .then(() => {
        global.db = createDb()
      })
  })

  it('raises an error if trying to find all on a destroyed database', () => {
    expect.hasAssertions()
    return global.db
      .destroy()
      .then(() => User.all())
      .catch(err => {
        expect(err.name).toEqual('Error')
      })
      .then(() => {
        global.db = createDb()
      })
  })

  it('raises an error if trying to save on a destroyed database', () => {
    expect.hasAssertions()
    return global.db
      .destroy()
      .then(() => user.save())
      .catch(err => {
        expect(err.name).toEqual('Error')
      })
      .then(() => {
        global.db = createDb()
      })
  })

  it('initially has no owner', () => {
    const collection = new Collection(fixtures.collection)

    expect(collection.owners).toBeUndefined()
    expect(collection.isOwner(user.id)).toBe(false)
    expect(collection.isOwner(otherUser.id)).toBe(false)
  })

  it('can set the owners of a Collection', () => {
    const collection = new Collection(fixtures.collection)

    collection.setOwners([otherUser.id])
    expect(collection.owners).toEqual([otherUser.id])
    expect(collection.isOwner(user.id)).toBe(false)
    expect(collection.isOwner(otherUser.id)).toBe(true)

    collection.setOwners([user.id, otherUser.id])
    expect(collection.owners.sort()).toEqual([user.id, otherUser.id].sort())
    expect(collection.isOwner(user.id)).toBe(true)
    expect(collection.isOwner(otherUser.id)).toBe(true)
  })

  it('cannot set owners to non-array', () => {
    const collection = new Collection(fixtures.collection)

    expect.hasAssertions()
    try {
      collection.setOwners('notAnArray')
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
      expect(err.message).toEqual('owners should be an array')
    }
  })

  it('can validate an object', () => {
    const user = new User(fixtures.user)
    user.email = 'notanemail'

    expect.hasAssertions()
    return user.save().catch(err => {
      expect(err.name).toEqual('ValidationError')
      expect(err.message).toEqual(
        'child "email" fails because ["email" must be a valid email]',
      )
    })
  })

  it('rejects a fragment with wrong fragmentType', () => {
    const fragment = new Fragment(fixtures.fragment)
    fragment.fragmentType = 'file'

    expect.hasAssertions()
    return fragment.save().catch(err => {
      expect(err.name).toEqual('ValidationError')
      expect(err.message).toEqual(
        'child "fragmentType" fails because ["fragmentType" must be one of [blogpost]], child "path" fails because ["path" is required]',
      )
    })
  })

  it('accepts a fragment with alternative fragmentType', () => {
    const fragment = new Fragment({ fragmentType: 'file', path: '/one/two' })

    return fragment.save()
  })

  it('saving the same object multiple times in parallel throws conflict error', async () => {
    expect.hasAssertions()
    try {
      await Promise.all([user.save(), user.save()])
    } catch (e) {
      expect(e).toHaveProperty('status', STATUS.CONFLICT)
    }
  })

  it('can find by multiple fields', async () => {
    const users = await User.findByField({
      username: 'testuser',
      email: 'test@example.com',
    })
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject({
      username: 'testuser',
      email: 'test@example.com',
    })
  })

  it('can find with complex value', async () => {
    const users = await User.findByField('username', { $ne: 'testuser' })
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject({
      username: 'changeduser',
      email: 'changed@email.com',
    })
  })
})
