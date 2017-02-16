const reducers = require.requireActual('../../src/reducers/teams')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')

const clone = require('lodash/clone')

module.exports = app => describeReducerSet('teams', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers['teams'])

  const user = app.user
  const usermod = clone(user)
  usermod.email = 'new@email.com'

  const mockstate = { users: [user] }

  describeReducer('getUsers success', {
    state: {},
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
    state: {},
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
    output: { users: [moduser] }
  })

  describeReducer('updateUser success', {
    state: mockstate,
    action: {
      type: T.UPDATE_USER_SUCCESS,
      team: mockteam
    },
    output: { isFetching: false }
  })
})
