import { fetch } from '../helpers/Utils'
const API_ENDPOINT = CONFIG['pubsweet-backend'].API_ENDPOINT
import * as T from './types'

const teamUrl = (team) => {
  let url = `${API_ENDPOINT}/teams`

  if (team) url += `/${team.id}`

  return url
}

function getTeamsRequest () {
  return {
    type: T.GET_TEAMS_REQUEST,
    isFetching: true
  }
}

function getTeamsSuccess (teams) {
  return {
    type: T.GET_TEAMS_SUCCESS,
    isFetching: false,
    teams: teams
  }
}

function getTeamsFailure (message) {
  return {
    type: T.GET_TEAMS_FAILURE,
    isFetching: false,
    message
  }
}

export function getTeams () {
  return (dispatch, getState) => {
    const { currentUser: { token } } = getState()
    let config = {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    }

    dispatch(getTeamsRequest())
    return fetch(API_ENDPOINT + '/teams', config).then(
        response => response.json()
      ).then(
        teams => dispatch(getTeamsSuccess(teams)),
        err => dispatch(getTeamsFailure(err))
      )
  }
}

function createTeamRequest (team) {
  return {
    type: T.CREATE_TEAM_REQUEST,
    team: team
  }
}

function createTeamSuccess (team) {
  return {
    type: T.CREATE_TEAM_SUCCESS,
    team: team
  }
}

function createTeamFailure (team, error) {
  return {
    type: T.CREATE_TEAM_FAILURE,
    isFetching: false,
    team: team,
    error: error
  }
}

export function createTeam (team) {
  return (dispatch, getState) => {
    dispatch(createTeamRequest(team))
    const { currentUser: { token } } = getState()

    const url = teamUrl()
    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(team)
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        team => dispatch(createTeamSuccess(team)),
        err => dispatch(createTeamFailure(team, err))
      )
  }
}

function updateTeamRequest (team) {
  return {
    type: T.UPDATE_TEAM_REQUEST,
    team: team
  }
}

function updateTeamSuccess (team) {
  return {
    type: T.UPDATE_TEAM_SUCCESS,
    team: team
  }
}

function updateTeamFailure (team, error) {
  return {
    type: T.UPDATE_TEAM_FAILURE,
    isFetching: false,
    team: team,
    error: error
  }
}

export function updateTeam (team) {
  return (dispatch, getState) => {
    dispatch(updateTeamRequest(team))
    const { currentUser: { token } } = getState()

    const url = teamUrl(team)
    const opts = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(team)
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        fragment => dispatch(updateTeamSuccess(team)),
        err => dispatch(updateTeamFailure(team, err))
      )
  }
}

function deleteTeamRequest (team) {
  return {
    type: T.DELETE_TEAM_REQUEST,
    team: team
  }
}

function deleteTeamSuccess (team) {
  return {
    type: T.DELETE_TEAM_SUCCESS,
    team: team
  }
}

function deleteTeamFailure (team, error) {
  return {
    type: T.DELETE_TEAM_FAILURE,
    isFetching: false,
    team: team,
    error: error
  }
}

export function deleteTeam (team) {
  return (dispatch, getState) => {
    dispatch(deleteTeamRequest(team))
    const { currentUser: { token } } = getState()

    const url = teamUrl(team)
    const opts = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(team)
    }

    return fetch(url, opts)
      .then(
        response => response.json()
      ).then(
        fragment => dispatch(deleteTeamSuccess(team)),
        err => dispatch(deleteTeamFailure(team, err))
      )
  }
}
