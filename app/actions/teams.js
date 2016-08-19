import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config'
import * as T from './types'

// TODO: This will break when rendered on a server
const localStorage = window.localStorage || undefined

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
  let config = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + localStorage.token }
  }

  return dispatch => {
    dispatch(getTeamsRequest())
    return fetch(API_ENDPOINT + '/teams', config)
      .then(response =>
        response.json().then(teams => ({ teams, response }))
      ).then(({ teams, response }) => {
        if (!response.ok) {
          dispatch(getTeamsFailure(teams.message))
          return Promise.reject(teams)
        } else {
          dispatch(getTeamsSuccess(teams))
        }
      }).catch(err => console.log('Error: ', err))
  }
}

export function createTeam () {}
export function updateTeam () {}
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

