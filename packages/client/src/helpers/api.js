import fetch from 'isomorphic-fetch'
import endpoint from './endpoint'

// read the authentication token from LocalStorage
import getToken from './token'

const parse = response => {
  if (response.headers.get('content-type').includes('application/json')) {
    return response.json()
  }

  return response.text()
}

const request = (url, options = {}) => {
  options.headers = options.headers || {}
  options.headers.Accept = options.headers.Accept || 'application/json'

  const token = getToken()

  if (token) {
    options.headers.Authorization = `Bearer ${token}`
  }

  if (!url.match(/^https?:/)) {
    url = endpoint + url
  }

  return fetch(url, options).then(response => {
    if (!response.ok) {
      return response.text().then(errorText => {
        const error = new Error(response.statusText || response.status)
        error.response = errorText
        error.statusCode = response.status
        throw error
      })
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

export const get = url =>
  request(url, {
    method: 'GET',
  })

export const create = (url, data) =>
  request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

export const update = (url, data, replace = false) =>
  request(url, {
    method: replace ? 'PUT' : 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

export const remove = url =>
  request(url, {
    method: 'DELETE',
  })

export default request
