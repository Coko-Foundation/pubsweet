const STATUS = require('http-status-codes')

const createBasicCollection = require('./helpers/basic_collection')
const dbCleaner = require('./helpers/db_cleaner')
const api = require('./helpers/api')
const setTeamForCollection = require('./helpers/set_team')
const fixtures = require('./fixtures/fixtures')

const Fragment = require('../src/models/Fragment')
const User = require('../src/models/User')

describe('authenticated api', function () {
  var otherUser
  var collection

  beforeEach(() => {
    // Create collection with admin user and one non-admin user
    return dbCleaner().then(
      createBasicCollection
    ).then(
      (userAndCol) => { collection = userAndCol.collection }
    ).then(
      () => {
        // Create another user without any roles
        otherUser = new User(fixtures.updatedUser)
        return otherUser.save()
      }
    )
  })

  afterEach(dbCleaner)

  it(`fails to create a fragment in a protected
      collection if authenticated as user without permissions`, () => {
    return api.users.authenticate.post(
      fixtures.updatedUser
    ).then(
      (token) => {
        return api.fragments.post(
          fixtures.fragment, collection, token
        ).expect(
          STATUS.FORBIDDEN
        )
      }
    )
  })

  describe('a non-admin user with a contributor role', () => {
    beforeEach(() => {
      return setTeamForCollection(
        [otherUser.id],
        collection,
        fixtures.team.contributors
      )
    })

    afterEach(() => {
      return setTeamForCollection(
        [],
        collection,
        fixtures.team.contributors
      )
    })

    it('creates a fragment in a protected collection', () => {
      return api.users.authenticate.post(
        fixtures.updatedUser
      ).then(
        token => {
          return api.fragments.post(
            fixtures.fragment, collection, token
          ).expect(
            STATUS.CREATED
          )
        }
      ).then(
        res => {
          expect(res.body.owners).toContainEqual({
            id: otherUser.id,
            username: otherUser.username
          })
        }
      )
    })

    describe('a fragment owned by the same user', () => {
      var fragment

      beforeEach(() => {
        fragment = new Fragment(fixtures.fragment)
        fragment.setOwners([otherUser.id])
        return fragment.save()
      })

      afterEach(() => {
        return fragment.delete()
      })

      it('updates a fragment in a protected collection if an owner', () => {
        return api.users.authenticate.post(
          fixtures.updatedUser
        ).then(
          (token) => {
            return api.fragments.put(
              fragment.id,
              fixtures.updatedFragment,
              collection,
              token
            ).expect(
              STATUS.OK
            )
          }
        )
      })
    })

    describe('actions on a fragment owned by a different user', () => {
      var fragment

      beforeEach(() => {
        const Fragment = require('../src/models/Fragment')
        fragment = new Fragment(fixtures.fragment)
        fragment.setOwners([otherUser.id])
        return fragment.save()
      })

      afterEach(() => {
        return fragment.delete()
      })

      it('cannot read a fragment in a protected collection if it is not published', () => {
        return api.users.authenticate.post(
          fixtures.updatedUser
        ).then(
          token => api.fragments.get(collection, token).expect(STATUS.OK)
        ).then(
          res => expect(res.body).toEqual([])
        )
      })

      it('cannot update a fragment in a protected collection', () => {
        return api.users.authenticate.post(
          fixtures.updatedUser
        ).then(
          token => {
            return api.fragments.put(
              fixtures.updatedFragment, collection, token
            ).expect(
              STATUS.UNAUTHORIZED
            )
          }
        )
      })
    })
  })

  describe('a non-admin user with a reader role', () => {
    beforeEach(() => {
      return setTeamForCollection(
        [otherUser.id],
        collection,
        fixtures.team.readers
      )
    })

    afterEach(() => {
      return setTeamForCollection(
        [],
        collection,
        fixtures.team.readers
      )
    })

    it('can not create a fragment', () => {
      return api.users.authenticate.post(
        fixtures.updatedUser
      ).then(
        token => {
          return api.fragments.post(
            fixtures.fragment, collection, token
          ).expect(
            STATUS.FORBIDDEN
          )
        }
      )
    })

    it('can read a fragment', function () {
      return api.users.authenticate.post(
        fixtures.updatedUser
      ).then(
        token => {
          return api.fragments.get(
            collection,
            token
          )
        }
      )
    })
  })

  it('fails to create a fragment in the protected collection if not authenticated', function () {
    return api.fragments.post(
      fixtures.fragment, collection
    ).expect(
      STATUS.UNAUTHORIZED
    )
  })

  it('fails to create a fragment in the protected collection if authentication wrong', function () {
    return api.fragments.post(
      fixtures.fragment, collection, 'wrong'
    ).expect(
      STATUS.UNAUTHORIZED
    )
  })
})
