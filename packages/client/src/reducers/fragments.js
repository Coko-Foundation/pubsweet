import clone from 'lodash/clone'
import unset from 'lodash/unset'

import {
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_REQUEST,
  CREATE_FRAGMENT_SUCCESS,
  CREATE_FRAGMENT_FAILURE,
  GET_FRAGMENT_REQUEST,
  GET_FRAGMENT_SUCCESS,
  UPDATE_FRAGMENT_REQUEST,
  UPDATE_FRAGMENT_SUCCESS,
  // UPDATE_FRAGMENT_FAILURE,
  DELETE_FRAGMENT_REQUEST,
  DELETE_FRAGMENT_FAILURE,
  DELETE_FRAGMENT_SUCCESS,
  LOGOUT_SUCCESS,
} from '../actions/types'

export default function(state = {}, action) {
  const fragments = clone(state)

  function replaceAll() {
    if (action.collection) {
      unset(fragments, action.collection.fragments)
    }
    action.fragments.forEach(fragment => {
      fragments[fragment.id] = fragment
    })
    return fragments
  }

  function setOne() {
    fragments[action.fragment.id] = action.fragment

    return fragments
  }

  function updateOne() {
    const oldfragment = fragments[action.fragment.id] || {}
    const update = action.update || action.fragment

    fragments[action.fragment.id] = { ...oldfragment, ...update }

    return fragments
  }

  function removeOne() {
    unset(fragments, action.fragment.id)
    return fragments
  }

  // choose the sword, and you will join me
  // choose the ball, and you join your mother... in death
  // you don't understand my words, but you must choose
  // 拝 一刀 | Ogami Ittō
  switch (action.type) {
    case UPDATE_FRAGMENT_REQUEST:
    case UPDATE_FRAGMENT_SUCCESS:
    case DELETE_FRAGMENT_REQUEST:
    case DELETE_FRAGMENT_FAILURE:
    case CREATE_FRAGMENT_SUCCESS:
    case CREATE_FRAGMENT_REQUEST:
      return updateOne()

    case GET_FRAGMENT_SUCCESS:
      return setOne()

    case GET_FRAGMENT_REQUEST:
    case CREATE_FRAGMENT_FAILURE:
    case DELETE_FRAGMENT_SUCCESS:
      return removeOne()

    case GET_FRAGMENTS_SUCCESS:
      return replaceAll()

    case LOGOUT_SUCCESS:
      return {}

    default:
      return state
  }
}
