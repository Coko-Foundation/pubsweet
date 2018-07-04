import * as api from 'pubsweet-client/src/helpers/api'

export const GET_FORM_REQUEST = 'GET_FORM_REQUEST'
export const GET_FORM_SUCCESS = 'GET_FORM_SUCCESS'
export const GET_FORM_FAILURE = 'GET_FORM_FAILURE'

function getFormRequest(project, version) {
  return {
    type: GET_FORM_REQUEST,
  }
}

function getFormSuccess(forms) {
  return {
    type: GET_FORM_SUCCESS,
    forms,
  }
}

function getFormFailure(project, version, error) {
  return {
    type: GET_FORM_FAILURE,
    error,
  }
}

export function getForms(project, version) {
  return dispatch => {
    dispatch(getFormRequest())

    return api
      .get('/get-forms', {})
      .then(result => {
        dispatch(getFormSuccess(result))
      })
      .catch(error => dispatch(getFormFailure(error)))
  }
}

export function updateForms(properties) {
  return dispatch => {
    dispatch(getFormRequest())

    return api
      .update('/get-forms', properties)
      .then(result => {
        dispatch(getFormSuccess(result))
      })
      .catch(error => dispatch(getFormFailure(error)))
  }
}

export function createForms(properties) {
  return dispatch => {
    dispatch(getFormRequest())

    return api
      .create('/get-forms', {})
      .then(result => {
        dispatch(getFormSuccess(result))
      })
      .catch(error => dispatch(getFormFailure(error)))
  }
}

const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FORM_REQUEST:
      return {}

    case GET_FORM_SUCCESS:
      return {
        forms: state.forms,
      }

    case GET_FORM_FAILURE:
      return { error: action.error }

    default:
      return state
  }
}
