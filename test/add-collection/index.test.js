let User
let Collection
let addCollection

describe('add-collection', () => {
  beforeEach(async () => {
    // need to reset modules to get fresh db because models hold a reference
    jest.resetModules()
    addCollection = require('../../src').addCollection
    Collection = require('pubsweet-server/src/models/Collection')
    User = require('pubsweet-server/src/models/User')
  })

  it('adds a collection to the database', async () => {
    await addCollection({})
    const [actualCollection] = await Collection.all()
    expect(actualCollection).toMatchObject({
      type: 'collection',
      owners: [],
    })
  })

  it('adds user as owner', async () => {
    const user = await new User({
      username: 'user',
      email: 'test@example.com',
      password: 'password',
    }).save()

    await addCollection({})
    const [actualCollection] = await Collection.all()
    expect(actualCollection).toMatchObject({
      type: 'collection',
      owners: [user.id],
    })
  })
})
