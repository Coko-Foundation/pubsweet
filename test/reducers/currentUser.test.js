const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/currentUser').default

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

describe('currentUser reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.currentUser).toBe(reducer)
  })

  const mockuser = {
    name: 'jo johnson'
  }

  it('currentUser success', () => {
    const actual = reducer({}, {
      type: T.GET_CURRENT_USER_SUCCESS,
      user: mockuser
    })
    expect(actual).toEqual({
      isFetching: false,
      isAuthenticated: true,
      user: mockuser
    })
  })

  it('currentUser failure', () => {
    const actual = reducer({}, {
      type: T.GET_CURRENT_USER_FAILURE
    })
    expect(actual).toEqual({ isFetching: false, isAuthenticated: false })
  })

  it('currentUser request', () => {
    const actual = reducer({}, {
      type: T.GET_CURRENT_USER_REQUEST
    })
    expect(actual).toEqual({ isFetching: true, isAuthenticated: false })
  })

  it('logout success', () => {
    const actual = reducer({
      user: mockuser
    }, {
      type: LOGOUT_SUCCESS
    })
    expect(actual).toEqual({
      isFetching: false,
      isAuthenticated: false,
      user: null
    })
  })
})
