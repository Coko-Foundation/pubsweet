import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from 'pubsweet-client/src/actions/types'

jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => undefined)

const reducer = require('./reducers').default

describe('Login reducer', () => {
  it('returns initial state', () => {
    const newState = reducer(undefined, {})
    expect(newState).toEqual({
      isFetching: false,
      isAuthenticated: false,
      token: undefined,
    })
  })

  it('stores username on login request', () => {
    const action = {
      type: LOGIN_REQUEST,
      credentials: { username: 'milo minderbinder' },
    }
    const newState = reducer(undefined, action)
    expect(newState).toMatchObject({
      isFetching: true,
      username: 'milo minderbinder',
    })
  })

  it('stores user and token on login success', () => {
    const action = {
      type: LOGIN_SUCCESS,
      user: { username: 'nurse duckett' },
      token: 't0k3n',
    }
    const newState = reducer(undefined, action)
    expect(newState).toMatchObject({
      isAuthenticated: true,
      user: action.user,
      token: action.token,
    })
  })

  it('stores error on login failure', () => {
    const action = { type: LOGIN_FAILURE, error: new Error('Flies in eyes') }
    const newState = reducer({ isAuthenticated: true }, action)
    expect(newState).toMatchObject({
      isAuthenticated: false,
      error: action.error,
    })
  })

  it('logs out on request', () => {
    const action = { type: LOGOUT_REQUEST }
    const newState = reducer({ isAuthenticated: true }, action)
    expect(newState).toMatchObject({
      isAuthenticated: false,
    })
  })

  it('logs out on logout success', () => {
    const action = { type: LOGOUT_SUCCESS }
    const newState = reducer({ isAuthenticated: true }, action)
    expect(newState).toMatchObject({
      isAuthenticated: false,
    })
  })
})
