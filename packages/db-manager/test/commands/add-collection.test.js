const { addCollection, createTables } = require('../../src')
const { User, Collection, Fragment } = require('pubsweet-server')

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

  it('adds fragment to collection', async () => {
    const fragment = await new Fragment({
      fragmentType: 'version',
    }).save()

    await addCollection({}, fragment)
    const [actualCollection] = await Collection.all()

    expect(actualCollection).toMatchObject({
      type: 'collection',
      owners: [],
      fragments: [fragment.id],
    })
  })
})
