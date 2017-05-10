const reducers = require.requireActual('../../src/reducers/users')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

const clone = require('lodash/clone')

module.exports = app => describeReducerSet('users', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers.default)

  const user = app.user
  const usermod = clone(user)
  usermod.email = 'new@email.com'

  const mockstate = { users: [user] }

  describeReducer('getUsers success', {
    action: {
      type: T.GET_USERS_SUCCESS,
      users: [user]
    },
    output: {
      isFetching: false,
      users: [user]
    }
  })

  describeReducer('getUsers request', {
    action: {
      type: T.GET_USERS_REQUEST
    },
    output: { isFetching: true }
  })

  describeReducer('updateUser request', {
    state: mockstate,
    action: {
      type: T.UPDATE_USER_REQUEST,
      user: usermod
    },
    output: { users: [usermod], isFetching: true }
  })

  describeReducer('updateUser success', {
    state: mockstate,
    action: {
      type: T.UPDATE_USER_SUCCESS,
      user: usermod
    },
    output: { users: [user], isFetching: false }
  })

  describeReducer('logout success', {
    state: mockstate,
    action: {
      type: LOGOUT_SUCCESS,
      user: usermod
    },
    output: {
      isFetching: false
    }
  })
})
