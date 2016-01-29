
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin (creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin (user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError (message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser (credentials) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${credentials.username}&password=${credentials.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(credentials))

    return fetch(API_ENDPOINT + '/users', config)
      .then(response =>
        response.json()
          .then(user => ({ user, response })))
          .then(({ user, response }) => {
            if (!response.ok) {
              // If there was a problem, we want to
              // dispatch the error condition
              dispatch(loginError(user.message))
              return Promise.reject(user)
            } else {
              // If login was successful, set the token in local storage
              localStorage.setItem('id_token', user.id_token)
              // Dispatch the success action
              dispatch(receiveLogin(user))
            }
          })
          .catch(err => console.log('Error: ', err))
  }
}
