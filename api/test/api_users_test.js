const STATUS = require('http-status-codes')
const expect = require('expect.js')

const cleanDB = require('./helpers/db_cleaner')
const User = require('../models/User')
const fixtures = require('./fixtures/fixtures')
const api = require('./helpers/api')

const noop = () => {}

describe('users api', () => {
  let userId

  beforeEach(() => {
    return cleanDB().then(
      () => require('../setup-base').setup(fixtures.user, fixtures.collection)
    ).then(
      user => { userId = user.id }
    )
  })

  afterEach(cleanDB)

  describe('admin', () => {
    var otherUser

    beforeEach(() => {
      otherUser = new User(fixtures.otherUser)

      return otherUser.save().then(
        user => { otherUser = user }
      )
    })

    afterEach(() => {
      return User.find(otherUser.id).then(
        user => user.delete()
      ).catch(
        noop // we might have already delete the user
      )
    })

    it('can get a list of users', () => {
      api.users.authenticate.post(
        fixtures.user
      ).then(
        token => api.users.get(null, token).expect(STATUS.OK)
      ).then(
        res => {
          expect(res.body.users.length).to.eql(2)
          expect(res.body.users[0].username).to.not.eql(undefined)
        }
      )
    })

    it('deletes a user', () => {
      return api.users.authenticate.post(
        fixtures.user
      ).then(
        token => api.users.del(otherUser.id, token).expect(STATUS.OK)
      )
    })
  })

  describe('unauthenticated user', () => {
    it(
      'can not get a list of users',
      () => api.users.get().expect(STATUS.UNAUTHORIZED)
    )

    it('can not sign up as an admin directly', () => {
      const fakeadmin = Object.assign(
        {}, fixtures.otherUser, { admin: true }
      )
      return api.users.post(fakeadmin).expect(STATUS.INTERNAL_SERVER_ERROR)
    })

    it('can sign up', () => {
      return api.users.post(
        fixtures.otherUser
      ).expect(
        STATUS.CREATED
      ).then(
        res => {
          expect(res.body.username).to.eql(fixtures.otherUser.username)
        }
      )
    })
  })

  describe('new user', () => {
    let otherUser

    beforeEach(() => {
      return new User(fixtures.otherUser).save().then(
        user => { otherUser = user }
      )
    })

    afterEach(() => {
      return User.find(otherUser.id).then(
        user => user.delete()
      ).catch(
        noop // we might have already delete the user
      )
    })

    it('can not get a list of users', () => {
      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.get(null, token).expect(STATUS.FORBIDDEN)
      )
    })

    it('can not delete other users', () => {
      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.del(userId, token).expect(STATUS.FORBIDDEN)
      )
    })

    it('can not get other users', () => {
      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.get(userId, token).expect(STATUS.FORBIDDEN)
      )
    })

    it('can get itself', () => {
      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.get(otherUser.id, token).expect(STATUS.OK)
      ).then(
        res => {
          expect(res.body.id).to.eql(otherUser.id)
          expect(res.body.username).to.eql(fixtures.otherUser.username)
        }
      )
    })

    it('can not make itself admin', () => {
      const newself = Object.assign(
        { id: otherUser.id, admin: true }, fixtures.otherUser
      )

      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.put(
          otherUser.id, newself, token
        ).expect(
          STATUS.FORBIDDEN
        )
      )
    })

    it('updates itself', () => {
      const newself = Object.assign({}, fixtures.updatedUser)

      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.put(otherUser.id, newself, token).expect(STATUS.OK)
      )
    })

    it('authenticates an updated user', () => {
      const newself = Object.assign({}, fixtures.updatedUser)

      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.put(
          otherUser.id, newself, token
        ).expect(
          STATUS.OK
        )
      ).then(
        api.users.authenticate.post(fixtures.updatedUser)
      )
    })

    it('persists an updated user', () => {
      const newself = Object.assign({}, fixtures.updatedUser)

      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.put(
          otherUser.id, newself, token
        ).expect(
          STATUS.OK
        ).then(
          () => token
        )
      ).then(
        token => api.users.get(otherUser.id, token).expect(STATUS.OK)
      ).then(
        res => {
          expect(res.body.id).to.eql(otherUser.id)
          expect(res.body.username).to.eql(fixtures.updatedUser.username)
        }
      )
    })

    it('user can delete itself', () => {
      const newself = Object.assign({}, fixtures.updatedUser)

      return api.users.authenticate.post(
        fixtures.otherUser
      ).then(
        token => api.users.put(
          otherUser.id, newself, token
        ).expect(
          STATUS.OK
        )
      ).then(
        () => api.users.authenticate.post(fixtures.updatedUser)
      ).then(
        token => api.users.del(otherUser.id, token).expect(STATUS.OK)
      )
    })
  })

  it('can not create a user if user exists', () => {
    return api.users.post(fixtures.user).expect(STATUS.CONFLICT)
  })
})
