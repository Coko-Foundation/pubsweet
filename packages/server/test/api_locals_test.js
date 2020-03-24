const { User } = require('@pubsweet/models')
const { fixtures } = require('@pubsweet/model-user/test')
const cleanDB = require('./helpers/db_cleaner')
const api = require('../src/app')(require('express')())

describe('api/app locals', () => {
  beforeEach(async () => {
    await cleanDB()
    return new User(fixtures.user).save()
  })

  it('exposes models', async () => {
    expect(api.locals.models.User.type).toEqual('user')
    expect(api.locals.models.Team.type).toEqual('team')
    expect(api.locals.models.Fragment.type).toEqual('fragment')
    expect(api.locals.models.Collection.type).toEqual('collection')

    const user = await api.locals.models.User.findByEmail(fixtures.user.email)
    expect(user.username).toEqual(fixtures.user.username)
  })
})
