import fetch from 'isomorphic-fetch'

const API_ENDPOINT = CONFIG['pubsweet-server'].API_ENDPOINT

// read the authentication token from LocalStorage
import getToken from './token'

const parse = response => {
  if (response.headers.get('content-type').indexOf('application/json') !== -1) {
    return response.json()
  }

  return response
}

const request = (url, options = {}) => {
  options.headers = options.headers || {}
  options.headers['Accept'] = options.headers['Accept'] || 'application/json'

  const token = getToken()

  if (token) {
    options.headers['Authorization'] = 'Bearer ' + token
  }

  if (!url.match(/^https?:/)) {
    url = API_ENDPOINT + url
  }

  return fetch(url, options).then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText || response.status)
      error.response = response.text() // NOTE: this is a promise
      throw error
    }

    return options.parse === false ? response : parse(response)
  })
  // .catch(error => {
  //   // TODO: handle network errors
  //   console.error(error)
  // })
}

// for backwards compatibility
export const deprecatedFetch = (url, options = {}) => {
  options.parse = false
  return request(url, options)
}

export const get = (url) => request(url, {
  method: 'GET'
})

export const create = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})

export const update = (url, data, replace = false) => request(url, {
  method: replace ? 'PUT' : 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})

export const remove = (url, data) => request(url, {
  method: 'DELETE'
})

export default request
