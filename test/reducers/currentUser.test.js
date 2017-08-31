const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/currentUser').default
const describeReducer = require.requireActual('../helpers/describeReducer')(reducer)

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

describe('currentUser reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.currentUser).to.equal(reducer)
  })

  const mockuser = {
    name: 'jo johnson'
  }

  describeReducer('currentUser success', {
    state: {},
    action: {
      type: T.GET_CURRENT_USER_SUCCESS,
      user: mockuser
    },
    output: {
      isFetching: false,
      isAuthenticated: true,
      user: mockuser
    }
  })

  describeReducer('currentUser failure', {
    state: {},
    action: {
      type: T.GET_CURRENT_USER_FAILURE
    },
    output: { isFetching: false, isAuthenticated: false }
  })

  describeReducer('currentUser request', {
    state: {},
    action: {
      type: T.GET_CURRENT_USER_REQUEST
    },
    output: { isFetching: true, isAuthenticated: false }
  })

  describeReducer('logout success', {
    state: {
      user: mockuser
    },
    action: {
      type: LOGOUT_SUCCESS
    },
    output: {
      isFetching: false,
      isAuthenticated: false,
      user: null
    }
  })
})
