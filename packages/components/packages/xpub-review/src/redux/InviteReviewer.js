import * as api from 'pubsweet-client/src/helpers/api'
import {
  GET_COLLECTION_SUCCESS,
  GET_FRAGMENT_SUCCESS,
} from 'pubsweet-client/src/actions/types'

export const MAKE_INVITATION_REQUEST = 'MAKE_INVITATION_REQUEST'
export const MAKE_INVITATION_SUCCESS = 'MAKE_INVITATION_SUCCESS'
export const MAKE_INVITATION_FAILURE = 'MAKE_INVITATION_FAILURE'

function makeInvitationRequest(project, version) {
  return {
    type: MAKE_INVITATION_REQUEST,
    project,
    version,
  }
}

function makeInvitationSuccess(project, version, result) {
  return {
    type: MAKE_INVITATION_SUCCESS,
    project,
    version,
    result,
  }
}

function makeInvitationFailure(project, version, error) {
  return {
    type: MAKE_INVITATION_FAILURE,
    project,
    version,
    error,
  }
}

export function makeInvitation(project, version) {
  return dispatch => {
    dispatch(makeInvitationRequest(project, version))

    return api
      .update('/make-invitation', {
        projectId: project.id,
        versionId: version.id,
        decision: version.decision,
      })
      .then(result => {
        dispatch({
          type: GET_COLLECTION_SUCCESS,
          collection: result.project,
          receivedAt: Date.now(),
        })
        dispatch({
          type: GET_FRAGMENT_SUCCESS,
          fragment: result.version,
          receivedAt: Date.now(),
        })
        if (result.nextVersion) {
          dispatch({
            type: GET_FRAGMENT_SUCCESS,
            fragment: result.nextVersion,
            receivedAt: Date.now(),
          })
        }
        dispatch(makeInvitationSuccess(project, version, result))
      })
      .catch(error => dispatch(makeInvitationFailure(project, version, error)))
  }
}

const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case MAKE_INVITATION_REQUEST:
      return {}

    case MAKE_INVITATION_SUCCESS:
      return {}

    case MAKE_INVITATION_FAILURE:
      return { error: action.error }

    default:
      return state
  }
}
