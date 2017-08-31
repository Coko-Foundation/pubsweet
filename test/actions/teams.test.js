global.PUBSWEET_COMPONENTS = []

const actions = require.requireActual('../../src/actions/teams')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require.requireActual('../../src/actions/types')

describe('teams actions', () => {
  let team

  describeAction('getTeams', {
    types: {
      request: T.GET_TEAMS_REQUEST,
      success: T.GET_TEAMS_SUCCESS,
      failure: T.GET_TEAMS_FAILURE
    },
    properties: {
      request: ['isFetching'],
      success: ['isFetching', 'teams'],
      failure: ['isFetching', 'message']
    }
  })

  describeAction('createTeam', {
    firstarg: {
      name: 'My readers',
      teamType: {
        name: 'Readers',
        permissions: 'read'
      },
      object: {
        kind: 'blogpost',
        source: '<blog></blog>',
        presentation: '<p></p>'
      }
    },
    types: {
      request: T.CREATE_TEAM_REQUEST,
      success: T.CREATE_TEAM_SUCCESS,
      failure: T.CREATE_TEAM_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    }
  }, (action, data) => {
    team = data[T.CREATE_TEAM_SUCCESS].team
  })

  describeAction('updateTeam', {
    firstarg: team,
    secondard: {
      name: 'My readers',
      teamType: {
        name: 'Readers',
        permissions: 'read'
      },
      object: {
        kind: 'blogpost',
        source: '<blog></blog>',
        presentation: '<p></p>'
      }
    },
    types: {
      request: T.UPDATE_TEAM_REQUEST,
      success: T.UPDATE_TEAM_SUCCESS,
      failure: T.UPDATE_TEAM_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    }
  })

  describeAction('deleteTeam', {
    firstarg: team,
    types: {
      request: T.DELETE_TEAM_REQUEST,
      success: T.DELETE_TEAM_SUCCESS,
      failure: T.DELETE_TEAM_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    }
  })
})
