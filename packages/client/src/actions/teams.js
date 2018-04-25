import * as api from '../helpers/api'
import * as T from './types'

const teamUrl = team => {
  let url = '/teams'

  if (team) url += `/${team.id}`

  return url
}

function getTeamsRequest() {
  return {
    type: T.GET_TEAMS_REQUEST,
    isFetching: true,
  }
}

function getTeamsSuccess(teams) {
  return {
    type: T.GET_TEAMS_SUCCESS,
    isFetching: false,
    teams,
  }
}

function getTeamsFailure(message) {
  return {
    type: T.GET_TEAMS_FAILURE,
    isFetching: false,
    message,
  }
}

export function getTeams() {
  return dispatch => {
    dispatch(getTeamsRequest())

    return api
      .get(teamUrl())
      .then(
        teams => dispatch(getTeamsSuccess(teams)),
        err => dispatch(getTeamsFailure(err)),
      )
  }
}

function createTeamRequest(team) {
  return {
    type: T.CREATE_TEAM_REQUEST,
    team,
  }
}

function createTeamSuccess(team) {
  return {
    type: T.CREATE_TEAM_SUCCESS,
    team,
  }
}

function createTeamFailure(team, error) {
  return {
    type: T.CREATE_TEAM_FAILURE,
    isFetching: false,
    team,
    error,
  }
}

export function createTeam(team) {
  return dispatch => {
    dispatch(createTeamRequest(team))

    const url = teamUrl()

    return api
      .create(url, team)
      .then(
        team => dispatch(createTeamSuccess(team)),
        err => dispatch(createTeamFailure(team, err)),
      )
  }
}

function updateTeamRequest(team) {
  return {
    type: T.UPDATE_TEAM_REQUEST,
    team,
  }
}

function updateTeamSuccess(team, update) {
  return {
    type: T.UPDATE_TEAM_SUCCESS,
    team,
    update,
  }
}

function updateTeamFailure(team, error) {
  return {
    type: T.UPDATE_TEAM_FAILURE,
    isFetching: false,
    team,
    error,
  }
}

export function updateTeam(team) {
  return dispatch => {
    dispatch(updateTeamRequest(team))
    const url = teamUrl(team)

    return api
      .update(url, team)
      .then(
        update => dispatch(updateTeamSuccess(team, update)),
        err => dispatch(updateTeamFailure(team, err)),
      )
  }
}

function deleteTeamRequest(team) {
  return {
    type: T.DELETE_TEAM_REQUEST,
    team,
  }
}

function deleteTeamSuccess(team) {
  return {
    type: T.DELETE_TEAM_SUCCESS,
    team,
  }
}

function deleteTeamFailure(team, error) {
  return {
    type: T.DELETE_TEAM_FAILURE,
    isFetching: false,
    team,
    error,
  }
}

export function deleteTeam(team) {
  return dispatch => {
    dispatch(deleteTeamRequest(team))

    const url = teamUrl(team)

    return api
      .remove(url)
      .then(
        team => dispatch(deleteTeamSuccess(team)),
        err => dispatch(deleteTeamFailure(team, err)),
      )
  }
}
