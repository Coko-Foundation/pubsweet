const path = require('path')

const pathToComponent = path.resolve(__dirname, 'extended-data-model-component')
process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/model-fragment",
    "@pubsweet/model-collection",
    "${pathToComponent}"
  ]
}}`

const { model: Manuscript } = require('./extended-data-model-component')
const { dbCleaner } = require('pubsweet-server/test')

describe('Extended Manuscript model', () => {
  let manuscript
  beforeEach(async () => {
    await dbCleaner()

    manuscript = await new Manuscript({
      published: true,
      doi: '10.1021/ac1014832',
    }).save()
  })

  it('can be saved with extended properties', async () => {
    expect(manuscript.doi).toEqual('10.1021/ac1014832')
    const foundManuscript = await Manuscript.find(manuscript.id)
    expect(foundManuscript.doi).toEqual('10.1021/ac1014832')
  })

  it('can be found by extended properties', async () => {
    const foundManuscript = await Manuscript.findOneByField(
      'doi',
      '10.1021/ac1014832',
    )
    expect(foundManuscript.id).toEqual(manuscript.id)
  })
})
