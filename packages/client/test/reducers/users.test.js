import { GET_CURRENT_USER_SUCCESS } from '../../src/actions/types'

const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/users').default

const T = require('../../src/actions/types')

describe('users reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.users).toBe(reducer)
  })

  const user = {
    username: 'fakeymcfake',
    password: 'correct battery horse staple',
    email: 'fakey_mcfake@pseudonymous.com',
    id: '57d0fc8e-ece9-47bf-87d3-7935326b0128',
  }

  const usermod = { ...user, email: 'new@email.com' }

  const mockstate = { users: [user] }

  it('getUsers success', () => {
    const actual = reducer(undefined, {
      type: T.GET_USERS_SUCCESS,
      users: [user],
    })
    expect(actual).toEqual({
      isFetching: false,
      users: [user],
    })
  })

  it('getUsers request', () => {
    const actual = reducer(undefined, {
      type: T.GET_USERS_REQUEST,
    })
    expect(actual).toEqual({
      isFetching: true,
      users: [],
    })
  })

  it('getUser success', () => {
    const actual = reducer(
      { users: [] },
      {
        type: T.GET_USER_SUCCESS,
        user,
      },
    )
    expect(actual).toEqual({
      users: [user],
      isFetching: false,
    })
  })

  it('updateUser request', () => {
    const actual = reducer(mockstate, {
      type: T.UPDATE_USER_REQUEST,
      user: usermod,
    })
    expect(actual).toEqual({
      users: [user],
      isFetching: true,
    })
  })

  it('updateUser success', () => {
    const actual = reducer(mockstate, {
      type: T.UPDATE_USER_SUCCESS,
      user: usermod,
    })
    expect(actual).toEqual({
      users: [usermod],
      isFetching: false,
    })
  })

  it('logout success', () => {
    const actual = reducer(mockstate, {
      type: T.LOGOUT_SUCCESS,
      user: usermod,
    })
    expect(actual).toEqual({
      users: [],
      isFetching: false,
    })
  })

  it('getCurrentUser success adds user to users array', () => {
    const actual = reducer(mockstate, {
      type: GET_CURRENT_USER_SUCCESS,
      user,
    })
    expect(actual).toEqual({
      users: [user],
    })
  })

  it('returns same state for unrecognised action', () => {
    const state = {}
    const actual = reducer(state, {
      type: 'something else',
    })
    expect(actual).toBe(state)
  })
})
