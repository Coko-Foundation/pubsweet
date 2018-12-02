// jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000

const STATUS = require('http-status-codes')

const cleanDB = require('./helpers/db_cleaner')
const User = require('../src/models/User')
const fixtures = require('./fixtures/fixtures')
const api = require('./helpers/api')
const setupBase = require('../src/setup-base')

describe('users api', () => {
  let userId

  beforeEach(async () => {
    await cleanDB()
    const { user } = await setupBase.setup(fixtures.user, fixtures.collection)
    userId = user.id
    expect(userId).not.toBeNull()
  })

  describe('admin', () => {
    let otherUser

    beforeEach(async () => {
      const user = new User(fixtures.otherUser)
      otherUser = await user.save()
    })

    it('can get a list of users', () =>
      api.users.authenticate
        .post(fixtures.user)
        .then(token => api.users.get({ token }).expect(STATUS.OK))
        .then(res => {
          expect(res.body.users).toHaveLength(2)
          expect(res.body.users[0].username).not.toBe(undefined)
        }))

    it('can get another user', () =>
      api.users.authenticate
        .post(fixtures.user)
        .then(token =>
          api.users.get({ userId: otherUser.id, token }).expect(STATUS.OK),
        )
        .then(res => {
          expect(res.body.username).toBe(otherUser.username)
        }))

    it('can make another user an admin', () => {
      const patchedUser = { ...otherUser, admin: true }

      return api.users.authenticate
        .post(fixtures.user)
        .then(token =>
          api.users.patch(otherUser.id, patchedUser, token).expect(STATUS.OK),
        )
    })

    it('deletes a user', () =>
      api.users.authenticate
        .post(fixtures.user)
        .then(token => api.users.del(otherUser.id, token).expect(STATUS.OK)))
  })

  describe('unauthenticated user', () => {
    it('can not get a list of users', () =>
      api.users.get({}).expect(STATUS.UNAUTHORIZED))

    it('cannot sign up as an admin directly', () => {
      const fakeAdmin = Object.assign({}, fixtures.otherUser, { admin: true })
      return api.users.post(fakeAdmin).expect(STATUS.BAD_REQUEST)
    })

    it('can sign up', () =>
      api.users
        .post(fixtures.otherUser)
        .expect(STATUS.CREATED)
        .then(res => {
          expect(res.body.username).toBe(fixtures.otherUser.username)
        }))
  })

  describe('new user', () => {
    let otherUser

    beforeEach(async () => {
      const user = new User(fixtures.otherUser)
      otherUser = await user.save()
    })

    afterEach(
      () =>
        User.find(otherUser.id)
          .then(user => user.delete())
          .catch(() => {}), // we might have already deleted the user
    )

    it('cant log in with the wrong username', () =>
      api.users.authenticate
        .post(
          {
            username: 'wrongusername',
            password: 'wrongpassword',
          },
          {
            expect: false,
            token: false,
          },
        )
        .then(res => {
          expect(res.statusCode).toEqual(STATUS.UNAUTHORIZED)
        }))

    it('cant log in with the wrong password', () =>
      api.users.authenticate
        .post(
          {
            username: otherUser.username,
            password: 'wrongpassword',
          },
          {
            expect: false,
            token: false,
          },
        )
        .then(res => {
          expect(res.statusCode).toEqual(STATUS.UNAUTHORIZED)
        }))

    it('can filter response with authsome', async () => {
      const response = await api.request.post('/api/users/authenticate').send({
        username: fixtures.otherUser.username,
        password: fixtures.otherUser.password,
      })

      expect(Object.keys(response.body)).not.toContain('passwordHash')
    })

    it('can verify its token', async () => {
      const token = await api.users.authenticate.post(fixtures.otherUser)
      const res = await api.users.authenticate.get(token).expect(STATUS.OK)

      expect(res.body.id).toBe(otherUser.id)
      expect(res.body.token).toBe(token)
    })

    it('can not get a list of users', () =>
      api.users.authenticate
        .post(fixtures.otherUser)
        .then(token => api.users.get({ token }).expect(STATUS.FORBIDDEN)))

    it('can not delete other users', () =>
      api.users.authenticate
        .post(fixtures.otherUser)
        .then(token => api.users.del(userId, token).expect(STATUS.FORBIDDEN)))

    it('can not get other users', () =>
      api.users.authenticate
        .post(fixtures.otherUser)
        .then(token =>
          api.users.get({ userId, token }).expect(STATUS.FORBIDDEN),
        ))

    it('can get itself', () =>
      api.users.authenticate
        .post(fixtures.otherUser)
        .then(token =>
          api.users.get({ userId: otherUser.id, token }).expect(STATUS.OK),
        )
        .then(res => {
          expect(res.body.id).toBe(otherUser.id)
          expect(res.body.username).toBe(fixtures.otherUser.username)
        }))

    it('can not make itself admin', () => {
      const newself = Object.assign(
        { id: otherUser.id, admin: true },
        fixtures.otherUser,
      )

      return api.users.authenticate
        .post(fixtures.otherUser)
        .then(token =>
          api.users
            .patch(otherUser.id, newself, token)
            .expect(STATUS.FORBIDDEN),
        )
    })

    it('updates itself', () => {
      const newSelf = Object.assign({}, otherUser, fixtures.updatedUser)

      return api.users.authenticate
        .post(fixtures.otherUser)
        .then(token =>
          api.users.patch(otherUser.id, newSelf, token).expect(STATUS.OK),
        )
    })

    it('authenticates an updated user', async () => {
      // authenticate
      const token = await api.users.authenticate.post(fixtures.otherUser)

      // change the username, email and password
      const updatedUser = Object.assign({}, otherUser, fixtures.updatedUser)
      await api.users.patch(otherUser.id, updatedUser, token).expect(STATUS.OK)

      // authenticate with the updated details
      await api.users.authenticate.post(fixtures.updatedUser)
    })

    it('persists an updated user', () => {
      const newSelf = Object.assign({}, otherUser, fixtures.updatedUser)

      return api.users.authenticate
        .post(fixtures.otherUser)
        .then(token =>
          api.users
            .patch(otherUser.id, newSelf, token)
            .expect(STATUS.OK)
            .then(() => token),
        )
        .then(token =>
          api.users.get({ userId: otherUser.id, token }).expect(STATUS.OK),
        )
        .then(res => {
          expect(res.body.id).toBe(otherUser.id)
          expect(res.body.username).toBe(fixtures.updatedUser.username)
        })
    })

    it('user can delete itself', async () => {
      // authenticate
      const otherUserToken = await api.users.authenticate.post(
        fixtures.otherUser,
      )

      // change username, email and password
      const updatedUser = Object.assign({}, otherUser, fixtures.updatedUser)
      await api.users
        .patch(otherUser.id, updatedUser, otherUserToken)
        .expect(STATUS.OK)

      // authenticate with updated details
      const updatedUserToken = await api.users.authenticate.post(
        fixtures.updatedUser,
      )

      // delete the updated user
      await api.users.del(otherUser.id, updatedUserToken).expect(STATUS.OK)
    })
  })

  it('cannot create a user if user exists', () =>
    api.users.post(fixtures.user).expect(STATUS.CONFLICT))
})
