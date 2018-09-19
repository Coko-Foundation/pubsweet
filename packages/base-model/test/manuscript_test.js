const path = require('path')

const pathToComponent = path.resolve(__dirname, 'data-model-component')
process.env.NODE_CONFIG = `{"pubsweet":{"components":["${pathToComponent}"]}}`

const { model: Manuscript } = require('./data-model-component')
const { dbCleaner } = require('pubsweet-server/test')

describe('Manuscript', () => {
  beforeEach(async () => {
    await dbCleaner()
  })

  it('can be saved and found and deleted', async () => {
    const manuscript = await new Manuscript({ title: 'Test' }).save()
    expect(manuscript.title).toEqual('Test')

    const foundManuscript = await Manuscript.find(manuscript.id)
    expect(foundManuscript.title).toEqual('Test')

    await foundManuscript.delete()

    async function tryToFind() {
      await Manuscript.find(foundManuscript.id)
    }
    await expect(tryToFind()).rejects.toThrow('Object not found')
  })

  it('can be found by property', async () => {
    await new Manuscript({ title: 'Test' }).save()
    const manuscript = await Manuscript.findOneByField('title', 'Test')
    expect(manuscript.title).toEqual('Test')

    let manuscripts = await Manuscript.findByField('title', 'Test')
    expect(manuscripts[0].title).toEqual('Test')

    async function findMissing() {
      await Manuscript.findOneByField('title', 'Does not exist')
    }

    await expect(findMissing()).rejects.toThrow('Object not found')

    manuscripts = await Manuscript.findByField('title', 'Does not exist')
    expect(manuscripts).toEqual([])
  })

  it('can not be saved with non-valid properties', async () => {
    async function createNonValidManuscript() {
      await new Manuscript({ mumbo: 'jumbo' }).save()
    }

    await expect(createNonValidManuscript()).rejects.toThrow(
      "mumbo is not a property in Manuscript's schema",
    )
  })

  it('throws if an unknown column is assigned', async () => {
    function createNonValidManuscript() {
      const manuscript = new Manuscript()
      manuscript.titldee = 'x'
    }

    expect(createNonValidManuscript).toThrow(
      "titldee is not a property in Manuscript's schema",
    )
  })

  it('takes schema specified in config into account', async () => {
    const manuscript = new Manuscript({ configField: 'hello' })
    expect(manuscript.configField).toEqual('hello')
  })
})
