const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/users').default
const describeReducer = require.requireActual('../helpers/describeReducer')(reducer)

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

describe('users reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.users).to.equal(reducer)
  })

  const user = {
    username: 'fakeymcfake',
    password: 'correct battery horse staple',
    email: 'fakey_mcfake@pseudonymous.com',
    id: '57d0fc8e-ece9-47bf-87d3-7935326b0128'
  }

  const usermod = {...user, email: 'new@email.com'}

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
    output: {
      isFetching: true,
      users: []
    }
  })

  describeReducer('getUser success', {
    state: { users: [] },
    action: {
      type: T.GET_USER_SUCCESS,
      user: user
    },
    output: {
      users: [user],
      isFetching: false
    }
  })

  describeReducer('updateUser request', {
    state: mockstate,
    action: {
      type: T.UPDATE_USER_REQUEST,
      user: usermod
    },
    output: {
      users: [user],
      isFetching: true
    }
  })

  describeReducer('updateUser success', {
    state: mockstate,
    action: {
      type: T.UPDATE_USER_SUCCESS,
      user: usermod
    },
    output: {
      users: [usermod],
      isFetching: false
    }
  })

  describeReducer('logout success', {
    state: mockstate,
    action: {
      type: LOGOUT_SUCCESS,
      user: usermod
    },
    output: {
      users: [],
      isFetching: false
    }
  })
})
