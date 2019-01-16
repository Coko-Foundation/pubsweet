process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/model-team-member",
    "@pubsweet/model-fragment"
  ]
}}`

const { model: Team } = require('../src')
const { model: User } = require('@pubsweet/model-user')

const { dbCleaner } = require('pubsweet-server/test')

describe('Team', () => {
  beforeEach(async () => {
    await dbCleaner()
  })

  it('has updated set when created', async () => {
    const team = await new Team({
      name: 'Test',
      role: 'globalSeniorEditor',
    }).save()
    expect(team.role).toEqual('globalSeniorEditor')
    const now = new Date().toISOString()
    expect(team.updated.toISOString()).toHaveLength(now.length)
  })

  it('can be saved and found and deleted', async () => {
    const team = await new Team({ name: 'Test', role: 'testRole' }).save()
    expect(team.name).toEqual('Test')

    const foundTeam = await Team.find(team.id)
    expect(foundTeam.name).toEqual('Test')

    await foundTeam.delete()

    async function tryToFind() {
      await Team.find(foundTeam.id)
    }
    await expect(tryToFind()).rejects.toThrow('Object not found')
  })

  it('can have some members', async () => {
    const user = await new User({
      email: 'some@example.com',
      username: 'test',
    }).save()
    const newTeam = await new Team({ name: 'Test', role: 'testRole' }).save()

    let team = await Team.query().findById(newTeam.id)
    await team.$relatedQuery('members').relate(user.id)

    team = await Team.query()
      .findById(newTeam.id)
      .eager('members')

    expect(team.members).toHaveLength(1)
  })

  // it('can be found by property', async () => {
  //   await new Manuscript({ title: 'Test' }).save()
  //   const team = await Manuscript.findOneByField('title', 'Test')
  //   expect(team.title).toEqual('Test')

  //   let manuscripts = await Manuscript.findByField('title', 'Test')
  //   expect(manuscripts[0].title).toEqual('Test')

  //   async function findMissing() {
  //     await Manuscript.findOneByField('title', 'Does not exist')
  //   }

  //   await expect(findMissing()).rejects.toThrow('Object not found')

  //   manuscripts = await Manuscript.findByField('title', 'Does not exist')
  //   expect(manuscripts).toEqual([])
  // })

  // it('can not be saved with non-valid properties', async () => {
  //   async function createNonValidManuscript() {
  //     await new Manuscript({ mumbo: 'jumbo' }).save()
  //   }

  //   await expect(createNonValidManuscript()).rejects.toThrow(
  //     'mumbo: is an invalid additional property',
  //   )
  // })

  // it('can assign to special properties', () => {
  //   const manuscript = new Manuscript()
  //   manuscript['#id'] = 'idref'
  // })

  // it('takes schema specified in config into account', async () => {
  //   const manuscript = new Manuscript({ configField: 'hello' })
  //   expect(manuscript.configField).toEqual('hello')
  // })

  // it('can save new entity with known ID', async () => {
  //   const id = '1838d074-fb9d-4ed6-9c63-39e6bc7429ce'
  //   const manuscript = await new Manuscript({ id }).save()
  //   expect(manuscript.id).toEqual(id)
  // })

  // it('old data does not overwrite new', async () => {
  //   // T0 - start time (A == B)
  //   let manuscriptA = await new Manuscript({ title: 'T0' }).save()
  //   expect(manuscriptA.title).toEqual('T0')
  //   const manuscriptB = await Manuscript.find(manuscriptA.id)

  //   // T1 - B is changed (not saved)
  //   manuscriptB.title = 'T1'

  //   // T2 - A is changed and saved
  //   manuscriptA.title = 'T2'
  //   manuscriptA = await manuscriptA.save()
  //   expect(manuscriptA.updated).not.toBe(manuscriptB.updated)

  //   // T4 - now save B, this should throw as `updated` is older than current.
  //   await expect(manuscriptB.save()).rejects.toThrow(
  //     'Data Integrity Error property updated',
  //   )
  // })
})
