const reducers = require.requireActual('../../src/reducers/current_user')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

module.exports = app => describeReducerSet('currentUser', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers.default)

  const mocktoken = 'abcd1234'

  const mockuser = {
    name: 'jo johnson',
    token: mocktoken
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
      user: mockuser,
      token: mocktoken
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
      user: mockuser,
      token: mocktoken
    },
    action: {
      type: LOGOUT_SUCCESS
    },
    output: {
      isFetching: false,
      isAuthenticated: false,
      user: null,
      token: null
    }
  })
})
