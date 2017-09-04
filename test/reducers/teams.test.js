const expect = require.requireActual('chai').expect
const allReducers = require.requireActual('../../src/reducers').default
const reducer = require.requireActual('../../src/reducers/teams').default

const T = require('../../src/actions/types')
const {LOGOUT_SUCCESS} = require('pubsweet-component-login/types')

describe('teams reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.teams).to.equal(reducer)
  })

  const mockteam = { name: 'someteam', id: '1234' }
  const mockstate = [mockteam]

  it('createTeam success', () => {
    const actual = reducer([], {
      type: T.CREATE_TEAM_SUCCESS,
      team: mockteam
    })
    expect(actual).to.eql(mockstate)
  })

  it('updateTeam success', () => {
    const actual = reducer([], {
      type: T.CREATE_TEAM_SUCCESS,
      team: mockteam
    })
    expect(actual).to.eql(mockstate)
  })

  it('getTeams success', () => {
    const actual = reducer(mockstate, {
      type: T.GET_TEAMS_SUCCESS,
      teams: mockstate
    })
    expect(actual).to.eql(mockstate)
  })

  it('deleteTeam success', () => {
    const actual = reducer(mockstate, {
      type: T.DELETE_TEAM_SUCCESS,
      team: mockteam
    })
    expect(actual).to.eql([])
  })

  it('logout success', () => {
    const actual = reducer(mockstate, {
      type: LOGOUT_SUCCESS
    })
    expect(actual).to.eql([])
  })
})
