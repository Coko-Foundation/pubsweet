const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/users').default

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

describe('users reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.users).to.equal(reducer)
  })

  const user = {
    username: 'fakeymcfake',
    password: 'correct battery horse staple',
    email: 'fakey_mcfake@pseudonymous.com',
    id: '57d0fc8e-ece9-47bf-87d3-7935326b0128'
  }

  const usermod = {...user, email: 'new@email.com'}

  const mockstate = { users: [user] }

  it('getUsers success', () => {
    const actual = reducer(undefined, {
      type: T.GET_USERS_SUCCESS,
      users: [user]
    })
    expect(actual).to.eql({
      isFetching: false,
      users: [user]
    })
  })

  it('getUsers request', () => {
    const actual = reducer(undefined, {
      type: T.GET_USERS_REQUEST
    })
    expect(actual).to.eql({
      isFetching: true,
      users: []
    })
  })

  it('getUser success', () => {
    const actual = reducer({ users: [] }, {
      type: T.GET_USER_SUCCESS,
      user: user
    })
    expect(actual).to.eql({
      users: [user],
      isFetching: false
    })
  })

  it('updateUser request', () => {
    const actual = reducer(mockstate, {
      type: T.UPDATE_USER_REQUEST,
      user: usermod
    })
    expect(actual).to.eql({
      users: [user],
      isFetching: true
    })
  })

  it('updateUser success', () => {
    const actual = reducer(mockstate, {
      type: T.UPDATE_USER_SUCCESS,
      user: usermod
    })
    expect(actual).to.eql({
      users: [usermod],
      isFetching: false
    })
  })

  it('logout success', () => {
    const actual = reducer(mockstate, {
      type: LOGOUT_SUCCESS,
      user: usermod
    })
    expect(actual).to.eql({
      users: [],
      isFetching: false
    })
  })
})
