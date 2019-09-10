const path = require('path')

const objection = require('objection')

const pathToComponent = path.resolve(__dirname, 'data-model-component')
process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/model-fragment",
    "${pathToComponent}"
  ]
}}`

const { model: Manuscript } = require('./data-model-component')
const { Team } = require('@pubsweet/models')

const { dbCleaner } = require('pubsweet-server/test')

describe('Manuscript', () => {
  beforeEach(async () => {
    await dbCleaner()
  })

  it('has updated set when created', async () => {
    const manuscript = await new Manuscript({ title: 'Test' }).save()
    expect(manuscript.title).toEqual('Test')
    const now = new Date().toISOString()
    expect(manuscript.updated.toISOString()).toHaveLength(now.length)
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

  it('can save and update graphs', async () => {
    const manuscript = await new Manuscript({
      title: 'Test',
      teams: [{ name: 'Test', role: 'test' }],
    }).saveGraph()

    const foundManuscript = await Manuscript.find(manuscript.id)
    expect(foundManuscript.title).toEqual('Test')

    const foundTeam = await Team.query().findOne({ objectId: manuscript.id })
    expect(foundTeam.name).toEqual('Test')

    const updateManuscript = await Manuscript.query()
      .findById(manuscript.id)
      .eager('teams')
    updateManuscript.title = 'Updated'
    updateManuscript.teams[0].name = 'Updated'

    const updatedManuscript = await updateManuscript.saveGraph()
    expect(updatedManuscript.title).toEqual('Updated')

    const updatedTeam = await Team.query().findOne({ objectId: manuscript.id })
    expect(updatedTeam.name).toEqual('Updated')
  })

  it('can override graph saving options', async () => {
    const manuscript = await new Manuscript({
      title: 'Test',
      teams: [{ name: 'Test', role: 'test' }],
    }).saveGraph()

    manuscript.teams[0] = Object.assign(manuscript.teams[0], {
      role: 'dontupdate',
    })

    await manuscript.saveGraph({ noUpdate: ['teams'] })
    const team = await Team.query().findById(manuscript.teams[0].id)

    expect(team.role).toEqual('test')
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
      'mumbo: is an invalid additional property',
    )
  })

  it('can assign to special properties', () => {
    const manuscript = new Manuscript()
    manuscript['#id'] = 'idref'
  })

  it('takes schema specified in config into account', async () => {
    const manuscript = new Manuscript({ configField: 'hello' })
    expect(manuscript.configField).toEqual('hello')
  })

  it('can save new entity with known ID', async () => {
    const id = '1838d074-fb9d-4ed6-9c63-39e6bc7429ce'
    const manuscript = await new Manuscript({ id }).save()
    expect(manuscript.id).toEqual(id)
  })

  it('old data does not overwrite new', async () => {
    // T0 - start time (A == B)
    let manuscriptA = await new Manuscript({ title: 'T0' }).save()
    expect(manuscriptA.title).toEqual('T0')
    const manuscriptB = await Manuscript.find(manuscriptA.id)

    // T1 - B is changed (not saved)
    manuscriptB.title = 'T1'

    // T2 - A is changed and saved
    manuscriptA.title = 'T2'
    manuscriptA = await manuscriptA.save()
    expect(manuscriptA.updated).not.toBe(manuscriptB.updated)

    // T4 - now save B, this should throw as `updated` is older than current.
    await expect(manuscriptB.save()).rejects.toThrow(
      'Data Integrity Error property updated',
    )
  })

  it('deletes the related teams when deleted', async () => {
    const manuscript = await new Manuscript({ title: 'Test' }).save()

    await new Team({
      role: 'test',
      name: 'Test',
      objectId: manuscript.id,
      objectType: 'Manuscript',
    }).save()

    await new Team({
      role: 'test',
      name: 'not associated',
    }).save()

    await manuscript.delete()

    const teams = await Team.query()
    expect(teams).toHaveLength(1)
  })

  it('should execute saveGraph inside a transaction', async () => {
    const spy = jest.spyOn(objection, 'transaction')

    await new Manuscript({
      title: 'Test',
      teams: [{ name: 'Test', role: 'test' }],
    }).saveGraph()

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
  it('should execute save inside a transaction', async () => {
    const spy = jest.spyOn(objection, 'transaction')

    await new Manuscript({ title: 'Test' }).save()

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
