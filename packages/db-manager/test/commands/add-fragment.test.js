const { addFragment, createTables } = require('../../src')
const { model: Fragment } = require('@pubsweet/model-fragment')
const { model: User } = require('@pubsweet/model-user')

describe('add-fragment', () => {
  beforeEach(() => createTables(true))

  it('adds a fragment to the database', async () => {
    await addFragment({ fragmentType: 'version' })
    const [actualFragment] = await Fragment.all()
    expect(actualFragment).toMatchObject({
      type: 'fragment',
      fragmentType: 'version',
      owners: [],
    })
  })

  it('adds user as owner', async () => {
    const user = await new User({
      username: 'user',
      email: 'test@example.com',
      password: 'password',
    }).save()

    await addFragment({ fragmentType: 'version' })
    const [actualFragment] = await Fragment.all()
    expect(actualFragment).toMatchObject({
      type: 'fragment',
      fragmentType: 'version',
      owners: [user.id],
    })
  })
})
