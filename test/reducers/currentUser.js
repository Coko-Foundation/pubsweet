const reducers = require.requireActual('../../src/reducers/current_user')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')

module.exports = app => describeReducerSet('currentUser', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers['currentUser'])

  const mockuser = {
    name: 'jo johnson'
  }

  const mocktoken = 'abcd1234'

  describeReducer('currentUser success', {
    state: {},
    action: {
      type: T.GET_USER_SUCCESS,
      user: mockuser,
      token: mocktoken
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
      type: T.GET_USER_FAILURE
    },
    output: { isFetching: false ,isAuthenticated: false }
  })

  describeReducer('currentUser request', {
    state: {},
    action: {
      type: T.GET_USER_REQUEST
    },
    output: { isFetching: true ,isAuthenticated: false }
  })
})
