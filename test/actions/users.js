// const expect = require.requireActual('chai').expect

const actions = require.requireActual('../../src/actions/users')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

module.exports = () => {
  const user = {
    username: 'fakeymcfake',
    password: 'correct battery horse staple',
    email: 'fakey_mcfake@pseudonymous.com',
    id: '57d0fc8e-ece9-47bf-87d3-7935326b0128'
  }

  describeAction('getUsers', {
    types: {
      request: T.GET_USERS_REQUEST,
      success: T.GET_USERS_SUCCESS,
      failure: T.GET_USERS_FAILURE
    },
    properties: {
      success: ['users'],
      failure: ['isFetching', 'message']
    }
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('getUser', {
    firstarg: { id: user.id },
    types: {
      request: T.GET_USER_REQUEST,
      success: T.GET_USER_SUCCESS,
      failure: T.GET_USER_FAILURE
    },
    properties: {
      request: ['user'],
      success: ['user'],
      failure: ['user', 'error']
    }
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('updateUser', {
    firstarg: user,
    secondarg: user,
    types: {
      request: T.UPDATE_USER_REQUEST,
      success: T.UPDATE_USER_SUCCESS,
      failure: T.UPDATE_USER_FAILURE
    },
    properties: {
      success: ['users'],
      failure: ['isFetching', 'error']
    }
  }, (action, data) => {
    // optional: more functionality tests here
  })
}
