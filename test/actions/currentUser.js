const actions = require.requireActual('../../src/actions/currentUser')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  describeAction('getCurrentUser', {
    types: {
      request: T.GET_CURRENT_USER_REQUEST,
      success: T.GET_CURRENT_USER_SUCCESS,
      failure: T.GET_CURRENT_USER_FAILURE
    },
    properties: {
      request: [],
      success: ['user'],
      failure: ['error']
    },
    user: () => app.user
  }, (action, data) => {

  })
}
