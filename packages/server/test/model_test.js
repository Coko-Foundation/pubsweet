const STATUS = require('http-status-codes')

const User = require('../src/models/User')
const Fragment = require('../src/models/Fragment')
const Collection = require('../src/models/Collection')
const dbCleaner = require('./helpers/db_cleaner')
const fixtures = require('./fixtures/fixtures')

describe('Model', () => {
  let user
  let otherUser

  beforeEach(async () => {
    await dbCleaner()
    user = await new User(fixtures.user).save()
    otherUser = await new User(fixtures.updatedUser).save()
  })

  it('can validate an object', () => {
    const user = new User({
      ...fixtures.user,
      username: 'invaliduser',
      email: 'notanemail',
    })

    expect.hasAssertions()
    return user.save().catch(err => {
      expect(err.name).toEqual('ValidationError')
      expect(err.message).toEqual(
        'child "email" fails because ["email" must be a valid email]',
      )
    })
  })

  it('rejects a fragment with wrong fragmentType', () => {
    const fragment = new Fragment(fixtures.fragment)
    fragment.fragmentType = 'file'

    expect.hasAssertions()
    return fragment.save().catch(err => {
      expect(err.name).toEqual('ValidationError')
      expect(err.message).toEqual(
        'child "fragmentType" fails because ["fragmentType" must be one of [blogpost]], child "path" fails because ["path" is required]',
      )
    })
  })

  it('accepts a fragment with alternative fragmentType', () => {
    const fragment = new Fragment({ fragmentType: 'file', path: '/one/two' })

    return fragment.save()
  })

  // TODO re-enable test once we switch to proper uniqueness constraints
  it.skip('saving the same object multiple times in parallel throws conflict error', async () => {
    expect.hasAssertions()
    try {
      await Promise.all([user.save(), user.save()])
    } catch (e) {
      expect(e).toHaveProperty('status', STATUS.CONFLICT)
    }
  })

  it('can find by multiple fields', async () => {
    const users = await User.findByField({
      username: 'testuser',
      email: 'test@example.com',
    })
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject({
      username: 'testuser',
      email: 'test@example.com',
    })
  })

  it('turns an object selector into SQL clauses', () => {
    expect(User.selectorToSql({ foo: 'bar', 'do.re.mi': 'fa so la' })).toEqual([
      "data->>'foo' = $1",
      "data->'do'->'re'->>'mi' = $2",
    ])
  })

  it('escapes naughty names', () => {
    expect(
      User.selectorToSql({ "Robert'); DROP TABLE Students; --": '' }),
    ).toEqual(["data->>'Robert''); DROP TABLE Students; --' = $1"])
  })
})
