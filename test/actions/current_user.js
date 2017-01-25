const actions = require.requireActual('../../src/actions/current_user')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  describeAction('getUser', {
    types: {
      request: T.GET_USER_REQUEST,
      success: T.GET_USER_SUCCESS,
      failure: T.GET_USER_FAILURE
    },
    properties: {
      request: ['isFetching'],
      success: ['isAuthenticated', 'user', 'token'],
      failure: ['isAuthenticated', 'error']
    },
    user: () => app.user
  }, action => {

  })
}
