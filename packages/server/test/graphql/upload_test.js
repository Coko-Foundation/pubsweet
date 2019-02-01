const { model: User } = require('@pubsweet/model-user')
const { fixtures } = require('@pubsweet/model-user/test')
const cleanDB = require('../helpers/db_cleaner')
const api = require('../helpers/api')
const authentication = require('../../src/authentication')

describe('GraphQL uploads', () => {
  let token
  let user
  beforeEach(async () => {
    await cleanDB()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('can upload a file', async () => {
    const { body } = await api.request
      .post('/graphql')
      .field(
        'operations',
        JSON.stringify({
          operationName: null,
          variables: { file: null },
          query:
            'mutation ($file: Upload!) {\n  upload(file: $file) {\n    url\n    __typename\n  }\n}\n',
        }),
      )
      .field('map', JSON.stringify({ '0': ['variables.file'] }))
      .attach('0', Buffer.from('hello world'), 'hello.txt')
      .set('Authorization', `Bearer ${token}`)

    expect(body).toMatchObject({
      data: {
        upload: { url: expect.stringMatching(/^\/\w{32}\.txt$/) },
      },
    })
  })
})
