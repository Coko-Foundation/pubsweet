const allReducers = require('../../src/reducers').default
const reducer = require('../../src/reducers/teams').default

const T = require('../../src/actions/types')

describe('teams reducers', () => {
  it('is exported in the all reducers object', () => {
    expect(allReducers.teams).toBe(reducer)
  })

  const mockteam = { name: 'someteam', id: '1234' }
  const mockstate = [mockteam]

  it('createTeam success', () => {
    const actual = reducer([], {
      type: T.CREATE_TEAM_SUCCESS,
      team: mockteam,
    })
    expect(actual).toEqual(mockstate)
  })

  it('updateTeam success', () => {
    // const updatedTeam = { ...mockteam, foo: 'bar' }
    const actual = reducer([mockstate, mockteam], {
      type: T.UPDATE_TEAM_SUCCESS,
      team: mockteam,
      update: {
        foo: 'bar',
      },
    })
    expect(actual).toEqual([mockstate, { ...mockteam, foo: 'bar' }])
  })

  it('getTeams success', () => {
    const actual = reducer(mockstate, {
      type: T.GET_TEAMS_SUCCESS,
      teams: mockstate,
    })
    expect(actual).toEqual(mockstate)
  })

  it('deleteTeam success', () => {
    const actual = reducer(mockstate, {
      type: T.DELETE_TEAM_SUCCESS,
      team: { ...mockteam },
    })
    expect(actual).toEqual([])
  })

  it('logout success', () => {
    const actual = reducer(mockstate, {
      type: T.LOGOUT_SUCCESS,
    })
    expect(actual).toEqual([])
  })

  it('getCollectionTeam success', () => {
    const extraTeam = { id: '4321', name: 'Another team' }
    const actual = reducer(mockstate, {
      type: T.GET_COLLECTION_TEAMS_SUCCESS,
      teams: [extraTeam, mockteam],
    })
    expect(actual).toEqual([mockteam, extraTeam])
  })

  it('returns same state for unrecognised action', () => {
    const state = []
    const actual = reducer(state, {
      type: 'something else',
    })
    expect(actual).toBe(state)
  })
})
