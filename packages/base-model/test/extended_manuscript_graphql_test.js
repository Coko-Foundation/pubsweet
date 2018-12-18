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
global.NODE_CONFIG = null
delete require.cache[require.resolve('config')]
const { model: Manuscript } = require('./extended-data-model-component')
const { model: User } = require('@pubsweet/model-user')
const fixtures = require('pubsweet-server/test/fixtures/fixtures')
const authentication = require('@pubsweet/model-user/src/authentication')

const { dbCleaner, api } = require('pubsweet-server/test')

describe('Extended Manuscript queries', () => {
  let token
  let user
  let admin
  let adminToken

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
    admin = await new User(fixtures.adminUser).save()
    adminToken = authentication.token.create(admin)
  })

  // Skipped because extended inputs are being worked on upstream:
  // https://github.com/apollographql/graphql-tools/pull/948
  it.skip('can create a manuscript with more properties', async () => {
    const { body } = await api.graphql.query(
      `mutation($input: ManuscriptInput) {
        createManuscript(input: $input) {
          title
          doi
        }
      }`,
      {
        input: {
          title: 'My doiscript',
          doi: 'some-doi',
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        createManuscript: {
          title: 'My manuscript',
          doi: 'some-doi',
        },
      },
    })
  })

  it('can query with an added property', async () => {
    await new Manuscript({ title: 'Before', doi: 'a-doi' }).save()

    const { body } = await api.graphql.query(
      `query($doi: String) {
        manuscriptByDOI(doi: $doi) { title, doi }
      }`,
      {
        doi: 'a-doi',
      },
      token,
    )

    expect(body).toEqual({
      data: {
        manuscriptByDOI: { title: 'Before', doi: 'a-doi' },
      },
    })
  })

  it('can return multiple results from query', async () => {
    await new Manuscript({ title: 'To delete' }).save()
    await new Manuscript({ title: 'Published', published: true }).save()
    await new Manuscript({ title: 'Published too', published: true }).save()

    const { body } = await api.graphql.query(
      `query {
        publishedManuscripts { title, doi }
      }`,
      {},
      token,
    )
    expect(body.data.publishedManuscripts).toHaveLength(2)
  })

  it('can work with authsome to authorize things in custom resolvers', async () => {
    await new Manuscript({
      title: 'Only admins can see this one',
      published: true,
    }).save()

    const { body: body1 } = await api.graphql.query(
      `query {
        publishedManuscripts { title, doi }
      }`,
      {},
      token,
    )
    expect(body1.data.publishedManuscripts).toHaveLength(0)

    const { body: body2 } = await api.graphql.query(
      `query {
        publishedManuscripts { title, doi }
      }`,
      {},
      adminToken,
    )
    expect(body2.data.publishedManuscripts).toHaveLength(1)
  })

  it('can use authsome helpers to filter individual fields', async () => {
    const manuscript = await new Manuscript({
      title: 'Only for fun',
      owners: [user.id],
    }).save()

    const { body } = await api.graphql.query(
      `mutation($id: ID, $input: PublishManuscriptInput) {
        publishManuscript(id: $id, input: $input) {
          published
          approvedByAuthor
        }
    }`,
      {
        id: manuscript.id,
        input: {
          published: true,
          approvedByAuthor: true,
        },
      },
      token,
    )
    expect(body.data.publishManuscript).toEqual({
      published: null,
      approvedByAuthor: true,
    })

    const { body: body1 } = await api.graphql.query(
      `mutation($id: ID, $input: PublishManuscriptInput) {
        publishManuscript(id: $id, input: $input) {
          published
          approvedByAuthor
        }
      }`,
      {
        id: manuscript.id,
        input: {
          published: true,
          approvedByAuthor: false,
        },
      },
      adminToken,
    )

    expect(body1.data.publishManuscript).toEqual({
      published: true,
      approvedByAuthor: true,
    })
  })
})
