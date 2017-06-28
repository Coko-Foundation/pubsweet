// const expect = require.requireActual('chai').expect

const actions = require.requireActual('../../src/actions/users')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = app => {
  // let user

  describeAction('getUsers', {
    types: {
      request: T.GET_USERS_REQUEST,
      success: T.GET_USERS_SUCCESS,
      failure: T.GET_USERS_FAILURE
    },
    properties: {
      success: ['users'],
      failure: ['isFetching', 'message']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('getUser', {
    firstarg: { id: app.user.id },
    types: {
      request: T.GET_USER_REQUEST,
      success: T.GET_USER_SUCCESS,
      failure: T.GET_USER_FAILURE
    },
    properties: {
      request: ['user'],
      success: ['user'],
      failure: ['user', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('updateUser', {
    firstarg: app.user,
    secondarg: app.user,
    types: {
      request: T.UPDATE_USER_REQUEST,
      success: T.UPDATE_USER_SUCCESS,
      failure: T.UPDATE_USER_FAILURE
    },
    properties: {
      success: ['users'],
      failure: ['isFetching', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })
}
