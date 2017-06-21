const reducers = require.requireActual('../../src/reducers/current_user')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

module.exports = app => describeReducerSet('currentUser', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers.default)

  const mockuser = {
    name: 'jo johnson'
  }

  describeReducer('currentUser success', {
    state: {},
    action: {
      type: T.GET_USER_SUCCESS,
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
      type: T.GET_USER_FAILURE
    },
    output: { isFetching: false, isAuthenticated: false }
  })

  describeReducer('currentUser request', {
    state: {},
    action: {
      type: T.GET_USER_REQUEST
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
