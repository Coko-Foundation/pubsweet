import { fetch } from '../helpers/Utils'
import { API_ENDPOINT } from '../../config'
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
    const { auth: { token } } = getState()
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
    const { auth: { token } } = getState()

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
        fragment => dispatch(createTeamSuccess(team)),
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
    const { auth: { token } } = getState()

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

export function deleteTeam () {}

// function updateUserRequest (user) {
//   return {
//     type: T.UPDATE_USER_REQUEST,
//     user: user,
//     isFetching: true
//   }
// }

// function updateUserSuccess (users) {
//   return {
//     type: T.UPDATE_USER_SUCCESS,
//     isFetching: false,
//     users: users
//   }
// }

// function updateUserFailure (message) {
//   return {
//     type: T.UPDATE_USER_FAILURE,
//     isFetching: false,
//     error: message
//   }
// }

// export function updateUser (user) {
//   let config = {
//     method: 'PUT',
//     headers: {
//       'Authorization': 'Bearer ' + localStorage.token,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
//   }

//   return dispatch => {
//     dispatch(updateUserRequest(user))
//     return fetch(API_ENDPOINT + '/users/' + user.id, config)
//       .then(response => {
//         if (response.ok) {
//           return response.json().then(user => {
//             dispatch(updateUserSuccess(user))
//           })
//         } else {
//           return response.json().then(response => {
//             dispatch(updateUserFailure(response.message))
//             throw new Error(response.message)
//           })
//         }
//       }).catch(err => {
//         dispatch(updateUserFailure(err.message))
//         console.log('Error: ', err)
//       })
//   }
// }

