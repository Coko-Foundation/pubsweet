const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/teams').default
const describeReducer = require.requireActual('../helpers/describeReducer')(reducer)

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

describe('teams reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.teams).to.equal(reducer)
  })

  const mockteam = { name: 'someteam', id: '1234' }
  const mockstate = [mockteam]

  describeReducer('createTeam success', {
    state: [],
    action: {
      type: T.CREATE_TEAM_SUCCESS,
      team: mockteam
    },
    output: mockstate
  })

  describeReducer('updateTeam success', {
    state: [],
    action: {
      type: T.CREATE_TEAM_SUCCESS,
      team: mockteam
    },
    output: mockstate
  })

  describeReducer('getTeams success', {
    state: mockstate,
    action: {
      type: T.GET_TEAMS_SUCCESS,
      teams: mockstate
    },
    output: mockstate
  })

  describeReducer('deleteTeam success', {
    state: mockstate,
    action: {
      type: T.DELETE_TEAM_SUCCESS,
      team: mockteam
    },
    output: []
  })

  describeReducer('logout success', {
    state: mockstate,
    action: {
      type: LOGOUT_SUCCESS
    },
    output: []
  })
})
