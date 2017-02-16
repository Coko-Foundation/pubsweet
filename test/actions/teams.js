const expect = require.requireActual('chai').expect

const actions = require.requireActual('../../src/actions/teams')
const describeAction = require.requireActual('../helpers/describeAction')(actions)
const T = require.requireActual('../../src/actions/types')
const fixtures = require.requireActual('../fixtures')

module.exports = app => {
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
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('createTeam', {
    firstarg: fixtures.readerTeam,
    types: {
      request: T.CREATE_TEAM_REQUEST,
      success: T.CREATE_TEAM_SUCCESS,
      failure: T.CREATE_TEAM_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    team = data[T.CREATE_TEAM_SUCCESS].team
    // optional: more functionality tests here
  })

  describeAction('updateTeam', {
    firstarg: () => team,
    secondard: fixtures.readerTeam,
    types: {
      request: T.UPDATE_TEAM_REQUEST,
      success: T.UPDATE_TEAM_SUCCESS,
      failure: T.UPDATE_TEAM_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })

  describeAction('deleteTeam', {
    firstarg: () => team,
    types: {
      request: T.DELETE_TEAM_REQUEST,
      success: T.DELETE_TEAM_SUCCESS,
      failure: T.DELETE_TEAM_FAILURE
    },
    properties: {
      request: ['team'],
      success: ['team'],
      failure: ['isFetching', 'team', 'error']
    },
    user: () => app.user
  }, (action, data) => {
    // optional: more functionality tests here
  })
}
