const reducers = require.requireActual('../../src/reducers/teams')
const describeReducerSet = require.requireActual('../helpers/describeReducerSet')

const T = require('../../src/actions/types')

module.exports = app => describeReducerSet('teams', reducers, () => {
  const describeReducer = require.requireActual(
    '../helpers/describeReducer'
  )(reducers.default)

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
})
