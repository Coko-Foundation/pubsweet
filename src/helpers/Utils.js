import isomorphicFetch from 'isomorphic-fetch'

export function fetch (url, options) {
  if (options == null) options = {}
  var error
  return isomorphicFetch(url, options).then(function (response) {
    if (response.ok) {
      return response
    } else {
      error = new Error(response.statusText || response.status)
      return response.text()
    }
  }).then(response => {
    if (error) {
      error.response = response
      return Promise.reject(error)
    } else {
      return response
    }
  })
}

export function fragmentsOfCollection (collection, allFragments) {
  if (collection) {
    return collection.fragments.filter(
        (fragmentId) => allFragments[fragmentId]
      ).map(
        (fragmentId) => allFragments[fragmentId]
      )
  } else {
    return []
  }
}
