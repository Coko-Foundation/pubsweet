const { model: User } = require('@pubsweet/model-user')
const fixtures = require('./fixtures/fixtures')
const cleanDB = require('./helpers/db_cleaner')
const api = require('../src/app')(require('express')())

describe('api/app locals', () => {
  beforeEach(async () => {
    await cleanDB()
    return new User(fixtures.adminUser).save()
  })

  afterEach(cleanDB)

  it('exposes models', async () => {
    expect(api.locals.models.User.type).toEqual('user')
    expect(api.locals.models.Team.type).toEqual('team')
    expect(api.locals.models.Fragment.type).toEqual('fragment')
    expect(api.locals.models.Collection.type).toEqual('collection')

    const user = await api.locals.models.User.findByEmail(
      fixtures.adminUser.email,
    )
    expect(user.username).toEqual(fixtures.adminUser.username)
  })
})
