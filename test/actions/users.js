const expect = require.requireActual('chai').expect

const actions = require.requireActual('../../src/actions/users')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  describeAction('getUsers', {
    types: {
      request: T.GET_USERS_REQUEST,
      success: T.GET_USERS_SUCCESS,
      failure: T.GET_USERS_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('updateUser', {
    firstarg: app,
    types: {
      request: T.UPDATE_USERS_REQUEST,
      success: T.UPDATE_USERS_SUCCESS,
      failure: T.UPDATE_USERS_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })
}
