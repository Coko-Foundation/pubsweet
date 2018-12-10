const STATUS = require('http-status-codes')
const { Fragment, Collection } = require('../src/models')
const { model: User } = require('@pubsweet/model-user')
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

  it('initially has no owners', () => {
    const collection = new Collection(fixtures.collection)

    expect(collection.owners).toEqual([])
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

  it('can validate an object', () => {
    const user = new User({
      ...fixtures.user,
      username: 'invaliduser',
      email: 'notanemail',
    })

    expect.hasAssertions()
    return user.save().catch(err => {
      expect(err.name).toEqual('ValidationError')
      expect(err.message).toEqual('email: should match format "email"')
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

  // TODO re-enable test once we switch to proper uniqueness constraints
  it.skip('saving the same object multiple times in parallel throws conflict error', async () => {
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
})
