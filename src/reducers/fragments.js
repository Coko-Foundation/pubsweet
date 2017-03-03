import {
  GET_FRAGMENTS_SUCCESS,
  CREATE_FRAGMENT_REQUEST,
  CREATE_FRAGMENT_SUCCESS,
  CREATE_FRAGMENT_FAILURE,
  UPDATE_FRAGMENT_REQUEST,
  UPDATE_FRAGMENT_SUCCESS,
  // UPDATE_FRAGMENT_FAILURE,
  DELETE_FRAGMENT_REQUEST,
  DELETE_FRAGMENT_FAILURE,
  DELETE_FRAGMENT_SUCCESS
} from '../actions/types'

import clone from 'lodash/clone'
import assign from 'lodash/assign'
import unset from 'lodash/unset'

export function fragments (state = {}, action) {
  const fragments = clone(state)

  function replaceAll () {
    unset(fragments, action.collection.fragments)
    action.fragments.forEach((fragment) => {
      fragments[fragment.id] = fragment
    })
    return fragments
  }

  function updateOne () {
    const oldfragment = fragments[action.fragment.id] || {}
    const update = action.update || action.fragment

    const newfragment = assign(oldfragment, update)
    fragments[action.fragment.id] = newfragment

    return fragments
  }

  function removeOne () {
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
    case CREATE_FRAGMENT_REQUEST: return updateOne()
    case CREATE_FRAGMENT_FAILURE:
    case DELETE_FRAGMENT_SUCCESS: return removeOne()
    case GET_FRAGMENTS_SUCCESS: return replaceAll()
  }

  return state
}
