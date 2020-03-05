const { dbCleaner } = require('pubsweet-server/test')
const fixtures = require('./fixtures')
const Identity = require('../src/identity')
const User = require('../src/user')

describe('Identity', () => {
  beforeEach(async () => {
    await dbCleaner()
  })

  it('can create a user with a default local identity', async () => {
    const user = await new User(fixtures.user).save()
    const defaultIdentity = await new Identity({
      name: 'Someone',
      aff: 'University of PubSweet',
      type: 'local',
      userId: user.id,
      isDefault: true,
    }).save()

    const savedUser = await User.find(user.id, { eager: 'defaultIdentity' })
    expect(savedUser.defaultIdentity).toEqual(defaultIdentity)
  })

  it('can create a user with a local and a default oauth identity', async () => {
    let user = await new User(fixtures.user).save()

    const localIdentity = await new Identity({
      name: 'Someone',
      aff: 'University of PubSweet',
      type: 'local',
      userId: user.id,
    }).save()

    const externalIdentity = await new Identity({
      type: 'external',
      identifier: 'orcid',
      userId: user.id,
      isDefault: true,
      oauth: {
        accessToken: 'someAccessToken',
        refreshToken: 'someRefreshToken',
      },
    }).save()

    user = await User.find(user.id, { eager: '[identities, defaultIdentity]' })

    expect(user.identities).toContainEqual(localIdentity)
    expect(user.identities).toContainEqual(externalIdentity)
    expect(user.defaultIdentity).toEqual(externalIdentity)
  })
})
