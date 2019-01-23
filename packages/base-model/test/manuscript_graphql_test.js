const path = require('path')

const pathToComponent = path.resolve(__dirname, 'data-model-component')
process.env.NODE_CONFIG = `{"pubsweet":{
  "components":[
    "@pubsweet/model-user",
    "@pubsweet/model-team",
    "@pubsweet/model-fragment",
    "${pathToComponent}"
  ]
}}`
const { model: User } = require('@pubsweet/model-user')
const { dbCleaner, api } = require('pubsweet-server/test')

const { fixtures } = require('@pubsweet/model-user/test')
const authentication = require('pubsweet-server/src/authentication')

const { model: Manuscript } = require('./data-model-component')

describe('Manuscript GraphQL', () => {
  let token
  let user

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    token = authentication.token.create(user)
  })

  it('can find manuscripts', async () => {
    await new Manuscript({ title: '1' }).save()
    await new Manuscript({ title: '2' }).save()

    const { body } = await api.graphql.query(
      `{ manuscripts { title } }`,
      {},
      token,
    )
    expect(body.data.manuscripts).toHaveLength(2)
  })

  it('can find manuscript by id', async () => {
    const manuscript = await new Manuscript({ title: '1' }).save()

    const { body } = await api.graphql.query(
      `query($id: ID) {
        manuscript(id: $id) {
          title
        }
      }`,
      { id: manuscript.id },
      token,
    )
    expect(body.data.manuscript.title).toEqual('1')
  })

  it('can create a manuscript', async () => {
    const { body } = await api.graphql.query(
      `mutation($input: ManuscriptInput) {
        createManuscript(input: $input) {
          title
          owners {
            id
          }
        }
      }`,
      {
        input: {
          title: 'My manuscript',
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        createManuscript: {
          title: 'My manuscript',
          owners: [{ id: user.id }],
        },
      },
    })
  })

  it('can update a manuscript', async () => {
    const manuscript = await new Manuscript({ title: 'Before' }).save()
    const { body } = await api.graphql.query(
      `mutation($id: ID, $input: ManuscriptInput) {
        updateManuscript(id: $id, input: $input) { title }
      }`,
      {
        id: manuscript.id,
        input: {
          title: 'After',
        },
      },
      token,
    )

    expect(body).toEqual({
      data: {
        updateManuscript: { title: 'After' },
      },
    })
  })

  it('can delete a manuscript', async () => {
    const manuscript = await new Manuscript({ title: 'To delete' }).save()
    const { body } = await api.graphql.query(
      `mutation($id: ID) {
        deleteManuscript(id: $id) { title }
      }`,
      { id: manuscript.id },
      token,
    )

    expect(body).toEqual({
      data: { deleteManuscript: { title: 'To delete' } },
    })
  })
})
