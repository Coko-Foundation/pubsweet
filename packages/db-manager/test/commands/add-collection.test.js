const { addCollection, createTables } = require('../../src')
const Collection = require('pubsweet-server/src/models/Collection')

describe('add-collection', () => {
  beforeEach(() => createTables(true))

  it('adds a collection to the database', async () => {
    await addCollection({})
    const [actualCollection] = await Collection.all()
    expect(actualCollection).toMatchObject({
      type: 'collection',
    })
  })
})
