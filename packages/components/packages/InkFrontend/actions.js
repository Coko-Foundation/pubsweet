import qs from 'query-string'
import request from 'pubsweet-client/src/helpers/api'
import { INK_FAILURE, INK_REQUEST, INK_SUCCESS } from './types'

export const inkRequest = () => ({
  type: INK_REQUEST
})

export const inkSuccess = converted => ({
  type: INK_SUCCESS,
  converted
})

export const inkFailure = error => ({
  type: INK_FAILURE,
  error
})

export const ink = (file, options) => dispatch => {
  dispatch(inkRequest())

  const body = new FormData()
  body.append('file', file)

  let url = '/ink'

  if (options) {
    url += '?' + qs.stringify(options)
  }

  return request(url, {
    method: 'POST',
    body
  }).then(data => {
    dispatch(inkSuccess(data.converted))

    return data
  }).catch(error => {
    dispatch(inkFailure(error.message))

    throw error
  })
}
