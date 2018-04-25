global.PUBSWEET_COMPONENTS = []

const actions = require('../../src/actions/teams')
const describeAction = require('../helpers/describeAction')(actions)
const T = require('../../src/actions/types')

describe('teams actions', () => {
  describeAction('getTeams', {
    types: {
      request: T.GET_TEAMS_REQUEST,
      success: T.GET_TEAMS_SUCCESS,
      failure: T.GET_TEAMS_FAILURE,
    },
    properties: {
      request: ['type', 'isFetching'],
      success: ['type', 'isFetching', 'teams'],
      failure: ['type', 'isFetching', 'message'],
    },
  })

  describeAction('createTeam', {
    firstarg: {
      name: 'My readers',
      teamType: {
        name: 'Readers',
        permissions: 'read',
      },
      object: {
        kind: 'blogpost',
        source: '<blog></blog>',
        presentation: '<p></p>',
      },
    },
    types: {
      request: T.CREATE_TEAM_REQUEST,
      success: T.CREATE_TEAM_SUCCESS,
      failure: T.CREATE_TEAM_FAILURE,
    },
    properties: {
      request: ['type', 'team'],
      success: ['type', 'team'],
      failure: ['type', 'isFetching', 'team', 'error'],
    },
  })

  describeAction('updateTeam', {
    firstarg: { id: 234 },
    secondard: {
      name: 'My readers',
      teamType: {
        name: 'Readers',
        permissions: 'read',
      },
      object: {
        kind: 'blogpost',
        source: '<blog></blog>',
        presentation: '<p></p>',
      },
    },
    types: {
      request: T.UPDATE_TEAM_REQUEST,
      success: T.UPDATE_TEAM_SUCCESS,
      failure: T.UPDATE_TEAM_FAILURE,
    },
    properties: {
      request: ['type', 'team'],
      success: ['type', 'team', 'update'],
      failure: ['type', 'isFetching', 'team', 'error'],
    },
  })

  describeAction('deleteTeam', {
    firstarg: { id: 234 },
    types: {
      request: T.DELETE_TEAM_REQUEST,
      success: T.DELETE_TEAM_SUCCESS,
      failure: T.DELETE_TEAM_FAILURE,
    },
    properties: {
      request: ['type', 'team'],
      success: ['type', 'team'],
      failure: ['type', 'isFetching', 'team', 'error'],
    },
  })
})
