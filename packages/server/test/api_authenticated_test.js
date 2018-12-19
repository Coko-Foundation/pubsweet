const STATUS = require('http-status-codes')

const createBasicCollection = require('./helpers/basic_collection')
const dbCleaner = require('./helpers/db_cleaner')
const api = require('./helpers/api')
const setTeamForCollection = require('./helpers/set_team')
const fixtures = require('./fixtures/fixtures')

const { Fragment, User } = require('../src/models')

describe('authenticated api', () => {
  let otherUser
  let user
  let collection

  beforeEach(async () => {
    // Create collection with admin user and one non-admin user
    await dbCleaner()
    ;({ user, collection } = await createBasicCollection())
    // Create another user without any roles
    otherUser = new User(fixtures.updatedUser)
    otherUser = await otherUser.save()
  })

  it(`fails to create a fragment in a protected
    collection if authenticated as user without permissions`, () =>
    api.users.authenticate.post(fixtures.updatedUser).then(token =>
      api.fragments
        .post({
          fragment: fixtures.fragment,
          collection,
          token,
        })
        .expect(STATUS.FORBIDDEN),
    ))

  describe('a non-admin user with a contributor role', () => {
    beforeEach(() =>
      setTeamForCollection(
        [otherUser.id],
        collection,
        fixtures.contributorTeam,
      ))

    afterEach(() =>
      setTeamForCollection([], collection, fixtures.contributorTeam))

    it('creates a fragment in a protected collection', () =>
      api.users.authenticate
        .post(fixtures.updatedUser)
        .then(token =>
          api.fragments
            .post({
              fragment: fixtures.fragment,
              collection,
              token,
            })
            .expect(STATUS.CREATED),
        )
        .then(res => {
          expect(res.body.owners).toContainEqual({
            id: otherUser.id,
            username: otherUser.username,
          })
        }))

    describe('a fragment owned by the same user', () => {
      let fragment

      beforeEach(async () => {
        fragment = new Fragment(fixtures.fragment)
        fragment.setOwners([otherUser.id])
        fragment = await fragment.save()

        collection.addFragment(fragment)
        collection = await collection.save()
      })

      afterEach(async () => {
        fragment = await fragment.delete()
        collection.removeFragment(fragment)
        collection = await collection.save()
      })

      it('updates a fragment in a protected collection if an owner', () =>
        api.users.authenticate.post(fixtures.updatedUser).then(token =>
          api.fragments
            .patch({
              fragmentId: fragment.id,
              update: { ...fixtures.updatedFragment, rev: fragment.rev },
              collection,
              token,
            })
            .expect(STATUS.OK),
        ))
    })

    describe('actions on a fragment owned by a different user', () => {
      let fragment

      beforeEach(async () => {
        fragment = new Fragment(fixtures.fragment)
        fragment.setOwners([user.id])
        await fragment.save()
        collection.addFragment(fragment)
        await collection.save()
      })

      afterEach(async () => {
        await fragment.delete()
        collection.removeFragment(fragment)
        await collection.save()
      })

      it('cannot read a fragment in a protected collection if it is not published', () =>
        api.users.authenticate
          .post(fixtures.updatedUser)
          .then(token =>
            api.fragments
              .get({
                collection,
                token,
              })
              .expect(STATUS.OK),
          )
          .then(res => expect(res.body).toEqual([])))

      it('cannot update a fragment in a protected collection', async () => {
        const token = await api.users.authenticate.post(fixtures.updatedUser)
        return api.fragments
          .patch({
            fragmentId: fragment.id,
            update: fixtures.updatedFragment,
            collection,
            token,
          })
          .expect(STATUS.FORBIDDEN)
      })
    })
  })

  describe('a non-admin user with a reader role', () => {
    beforeEach(() =>
      setTeamForCollection([otherUser.id], collection, fixtures.readerTeam))

    afterEach(() => setTeamForCollection([], collection, fixtures.readerTeam))

    it('can not create a fragment', () =>
      api.users.authenticate.post(fixtures.updatedUser).then(token =>
        api.fragments
          .post({
            fragment: fixtures.fragment,
            collection,
            token,
          })
          .expect(STATUS.FORBIDDEN),
      ))

    it('can read a fragment', () =>
      api.users.authenticate
        .post(fixtures.updatedUser)
        .then(token => api.fragments.get({ collection, token })))
  })

  it('fails to create a fragment in the protected collection if not authenticated', () =>
    api.fragments
      .post({
        fragment: fixtures.fragment,
        collection,
      })
      .expect(STATUS.UNAUTHORIZED))

  it('fails to create a fragment in the protected collection if authentication wrong', () =>
    api.fragments
      .post({
        fragment: fixtures.fragment,
        collection,
        token: 'wrong',
      })
      .expect(STATUS.UNAUTHORIZED))
})
