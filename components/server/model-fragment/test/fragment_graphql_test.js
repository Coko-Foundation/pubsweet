process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/model-fragment"
  ]
}}`

const { model: User } = require('@pubsweet/model-user')
const { dbCleaner, api } = require('pubsweet-server/test')

const { fixtures } = require('@pubsweet/model-user/test')
const authentication = require('pubsweet-server/src/authentication')

const Fragment = require('../src/fragment')

const { db } = require('@pubsweet/db-manager')

describe('Fragment queries', () => {
  let token
  let user
  let otherUser

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    otherUser = await new User(fixtures.otherUser).save()

    token = authentication.token.create(user)
  })

  it('lists fragments', async () => {
    await Fragment.query().insert({
      fragmentType: 'testing',
      owners: [user.id],
    })
    await Fragment.query().insert({
      fragmentType: 'testing2',
      owners: [otherUser.id],
    })

    const whereIn = jest.spyOn(db.client, 'query')

    const { body } = await api.graphql.query(
      `query {
        fragments {
          fragmentType
          owners {
            username
          }
        }
      }`,
      {},
      token,
    )

    // Gets the actual query that the database was called with
    const lastCall = whereIn.mock.calls[whereIn.mock.calls.length - 1][1]
    expect(lastCall.sql).toBe(
      'select "users".* from "users" where "id" in ($1, $2)',
    )
    expect(lastCall.bindings.sort).toBe([user.id, otherUser.id].sort)
    expect(body.data.fragments).toMatchSnapshot()
  })
})
