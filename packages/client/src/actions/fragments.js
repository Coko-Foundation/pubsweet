import * as api from '../helpers/api'
import * as T from './types'

export const fragmentUrl = (collection, fragment) => {
  let url = ''
  if (collection) url += `/collections/${collection.id}`
  url += '/fragments'
  if (fragment && fragment.id) url += `/${fragment.id}`

  return url
}

function getFragmentsRequest(collection) {
  return {
    type: T.GET_FRAGMENTS_REQUEST,
    collection,
  }
}

function getFragmentsSuccess(collection, fragments) {
  return {
    type: T.GET_FRAGMENTS_SUCCESS,
    collection,
    fragments,
    receivedAt: Date.now(),
  }
}

function getFragmentsFailure(error) {
  return {
    type: T.GET_FRAGMENTS_FAILURE,
    error,
  }
}

export function getFragments(collection, options) {
  return dispatch => {
    dispatch(getFragmentsRequest(collection))

    let url = fragmentUrl(collection)

    if (options && options.fields) {
      url += `?fields=${encodeURIComponent(options.fields.join(','))}`
    }

    return api
      .get(url)
      .then(
        fragments => dispatch(getFragmentsSuccess(collection, fragments)),
        err => dispatch(getFragmentsFailure(err)),
      )
  }
}

function createFragmentRequest(fragment) {
  return {
    type: T.CREATE_FRAGMENT_REQUEST,
    fragment,
  }
}

function createFragmentSuccess(collection, fragment) {
  return {
    type: T.CREATE_FRAGMENT_SUCCESS,
    collection,
    fragment,
  }
}

function createFragmentFailure(fragment, error) {
  return {
    type: T.CREATE_FRAGMENT_FAILURE,
    isFetching: false,
    fragment,
    error,
  }
}

export function createFragment(collection, fragment) {
  return dispatch => {
    dispatch(createFragmentRequest(fragment))

    const url = fragmentUrl(collection, fragment)

    return api
      .create(url, fragment)
      .then(
        fragment => dispatch(createFragmentSuccess(collection, fragment)),
        err => dispatch(createFragmentFailure(fragment, err)),
      )
  }
}

function getFragmentRequest(fragment) {
  return {
    type: T.GET_FRAGMENT_REQUEST,
    fragment,
  }
}

function getFragmentSuccess(fragment) {
  return {
    type: T.GET_FRAGMENT_SUCCESS,
    fragment,
    receivedAt: Date.now(),
  }
}

function getFragmentFailure(fragment, error) {
  return {
    type: T.GET_FRAGMENT_FAILURE,
    isFetching: false,
    fragment,
    error,
  }
}

export function getFragment(collection, fragment) {
  return dispatch => {
    dispatch(getFragmentRequest(fragment))

    const url = fragmentUrl(collection, fragment)

    return api
      .get(url)
      .then(
        fragment => dispatch(getFragmentSuccess(fragment)),
        err => dispatch(getFragmentFailure(fragment, err)),
      )
  }
}

function updateFragmentRequest(fragment) {
  return {
    type: T.UPDATE_FRAGMENT_REQUEST,
    fragment,
  }
}

function updateFragmentSuccess(fragment, update) {
  return {
    type: T.UPDATE_FRAGMENT_SUCCESS,
    fragment,
    update,
    receivedAt: Date.now(),
  }
}

function updateFragmentFailure(fragment, error) {
  return {
    type: T.UPDATE_FRAGMENT_FAILURE,
    isFetching: false,
    fragment,
    error,
  }
}

export function updateFragment(collection, fragment) {
  return dispatch => {
    dispatch(updateFragmentRequest(fragment))

    const url = fragmentUrl(collection, fragment)

    return api
      .update(url, fragment)
      .then(
        update => dispatch(updateFragmentSuccess(fragment, update)),
        err => dispatch(updateFragmentFailure(fragment, err)),
      )
  }
}

function deleteFragmentRequest(fragment) {
  return {
    type: T.DELETE_FRAGMENT_REQUEST,
    fragment,
    update: { deleted: true },
  }
}

function deleteFragmentSuccess(collection, fragment) {
  return {
    type: T.DELETE_FRAGMENT_SUCCESS,
    collection,
    fragment,
  }
}

function deleteFragmentFailure(fragment, error) {
  return {
    type: T.DELETE_FRAGMENT_FAILURE,
    fragment,
    update: { deleted: undefined },
    error,
  }
}

export function deleteFragment(collection, fragment) {
  return dispatch => {
    dispatch(deleteFragmentRequest(fragment))

    const url = fragmentUrl(collection, fragment)

    return api
      .remove(url)
      .then(
        json => dispatch(deleteFragmentSuccess(collection, fragment)),
        err => dispatch(deleteFragmentFailure(fragment, err)),
      )
  }
}
