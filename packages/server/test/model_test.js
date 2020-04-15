const { Fragment, Collection } = require('@pubsweet/models')
const { User } = require('@pubsweet/models')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

const userFixtures = require('@pubsweet/model-user/test/fixtures')

describe('Model', () => {
  let user
  let otherUser

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(userFixtures.user).save()
    otherUser = await new User(userFixtures.updatedUser).save()
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
      ...userFixtures.user,
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
      expect(err.message).toEqual('fragmentType: should be equal to constant')
    })
  })

  it('saving the same object multiple times in parallel throws conflict error', async () => {
    expect.hasAssertions()

    const sameUser = await User.find(user.id)

    await expect(Promise.all([user.save(), sameUser.save()])).rejects.toThrow(
      'Integrity Error',
    )
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
