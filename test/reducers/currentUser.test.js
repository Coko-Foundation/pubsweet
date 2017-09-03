const reducers = require.requireActual('../../src/reducers/currentUser')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')
const describeReducer = require.requireActual('../helpers/describeReducer')(reducers.default)

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

describe('currentUser reducers', () => {
  describeReducerSet('currentUser', reducers)

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
