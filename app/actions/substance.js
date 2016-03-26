import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from '../../config.js'
import * as T from './types'

import { createFragmentFailure, createFragmentSuccess, createFragmentRequest } from './index'

// CREATE substance document
export function createSubstanceDocument (document) {
  return (dispatch, getState) => {
    dispatch(createFragmentRequest(document))
    const { auth: { token } } = getState()
    return fetch(API_ENDPOINT + '/substance/documents', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(document)})
      .then(response => {
        if (response.ok) {
          return response.json().then(response => {
            dispatch(createFragmentSuccess(response))
            dispatch(getSubstanceDocumentSuccess(response))
          })
        } else {
          return response.json().then(response => {
            dispatch(createFragmentFailure(response.message))
            throw new Error(response.message)
          })
        }
      })
      .catch(err => console.error(err))
  }
}
// GET substance document
export function getSubstanceDocument (id) {
  return (dispatch, getState) => {
    return fetch(API_ENDPOINT + '/substance/documents/' + id)
      .then(response => response.json())
      .then(document => dispatch(getSubstanceDocumentSuccess(document)))
  }
}

// GET substance document success
function getSubstanceDocumentSuccess (document) {
  return {
    type: T.GET_SUBSTANCE_DOCUMENT_SUCCESS,
    document: document
  }
}
