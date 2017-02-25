const express = require('express')
const app = express()
var api = require('../src')(app)

const User = require('../src/models/User')
const fixtures = require('./fixtures/fixtures')
const cleanDB = require('./helpers/db_cleaner')

describe('api/app locals', () => {
  beforeEach(() => {
    return cleanDB().then(
      () => { return new User(fixtures.adminUser).save() }
    )
  })

  afterEach(cleanDB)

  it('exposes models', () => {
    expect(api.locals.models.User.type).toEqual('user')
    expect(api.locals.models.Team.type).toEqual('team')
    expect(api.locals.models.Fragment.type).toEqual('fragment')
    expect(api.locals.models.Collection.type).toEqual('collection')

    return api.locals.models.User.findByEmail(fixtures.adminUser.email).then((user) => {
      return expect(user.username).toEqual(fixtures.adminUser.username)
    })
  })
})
