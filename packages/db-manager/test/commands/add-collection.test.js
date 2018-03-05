const { addCollection, createTables } = require('../../src')
const Collection = require('pubsweet-server/src/models/Collection')
const User = require('pubsweet-server/src/models/User')

describe('add-collection', () => {
  beforeEach(() => createTables(true))

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