import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from 'pubsweet-client/src/actions/types'
import api from 'pubsweet-client/src/helpers/api'

jest.mock('pubsweet-client/src/helpers/api', () => ({
  create: jest.fn(() => Promise.resolve({})),
}))

// See https://github.com/facebook/jest/issues/6798
jest.spyOn(Storage.prototype, 'setItem')
jest.spyOn(Storage.prototype, 'removeItem')

const { loginUser, logoutUser } = require('./actions')

describe('Login actions', () => {
  const createMockStore = configureStore([thunk])

  afterEach(jest.clearAllMocks)

  describe('loginUser', () => {
    it("doesn't get authenticated on failure", async () => {
      const store = createMockStore({})
      const credentials = { username: 'mr blobby' }
      const error = { response: JSON.stringify({ message: 'Nope' }) }

      jest
        .spyOn(api, 'create')
        .mockImplementationOnce(jest.fn(() => Promise.reject(error)))

      await store.dispatch(loginUser(credentials, '/', jest.fn(() => {})))
      const [firstAction, secondAction] = store.getActions()

      expect(firstAction).toMatchObject({
        type: LOGIN_REQUEST,
        credentials,
      })

      expect(secondAction).toMatchObject({
        type: LOGIN_FAILURE,
        error,
      })
    })

    it('logs user in on success', async () => {
      const store = createMockStore({})
      const credentials = { username: 'mr blobby' }
      const user = { username: 'mr blobby', token: 't0k3n' }
      jest
        .spyOn(api, 'create')
        .mockImplementationOnce(jest.fn(() => Promise.resolve(user)))

      await store.dispatch(loginUser(credentials))
      const [firstAction, secondAction] = store.getActions()

      expect(firstAction).toMatchObject({
        type: LOGIN_REQUEST,
        credentials,
      })

      expect(secondAction).toMatchObject({
        type: LOGIN_SUCCESS,
        user,
      })
    })

    it('stores token in localStorage', async () => {
      const store = createMockStore({})
      const user = { username: 'mr blobby', token: 't0k3n' }
      jest
        .spyOn(api, 'create')
        .mockImplementationOnce(jest.fn(() => Promise.resolve(user)))

      await store.dispatch(loginUser())
      expect(global.window.localStorage.setItem).toHaveBeenCalledWith(
        'token',
        user.token,
      )
    })

    it('redirects after login', async () => {
      const store = createMockStore({})
      jest
        .spyOn(api, 'create')
        .mockImplementationOnce(jest.fn(() => Promise.resolve({})))

      await store.dispatch(loginUser({}, 'redirect/here'))

      const [, , thirdAction] = store.getActions()

      expect(thirdAction).toMatchObject({
        type: '@@router/CALL_HISTORY_METHOD',
      })
    })
  })

  describe('logoutUser', () => {
    it('logs out user', async () => {
      const store = createMockStore({})

      await store.dispatch(logoutUser())
      const [firstAction, secondAction, thirdAction] = store.getActions()

      expect(firstAction).toMatchObject({
        type: LOGOUT_REQUEST,
      })

      expect(secondAction).toMatchObject({
        type: LOGOUT_SUCCESS,
        isAuthenticated: false,
      })

      expect(thirdAction).toBeUndefined()
    })

    it('logs out user and redirects', async () => {
      const store = createMockStore({})

      await store.dispatch(logoutUser('redirect/to/here'))
      const [, , thirdAction] = store.getActions()

      expect(thirdAction).toMatchObject({
        type: '@@router/CALL_HISTORY_METHOD',
      })
    })

    it('clears token from localStorage', async () => {
      const store = createMockStore({})

      await store.dispatch(logoutUser())

      expect(global.window.localStorage.removeItem).toHaveBeenCalledWith(
        'token',
      )
    })
  })
})
