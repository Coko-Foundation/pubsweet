import isomorphicFetch from 'isomorphic-fetch'

export function fetch (url, options) {
  if (options == null) options = {}
  return isomorphicFetch(url, options).then(function (response) {
    if (response.ok) {
      return Promise.resolve(response)
    } else {
      var error = new Error(response.statusText || response.status)
      error.response = response
      return Promise.reject(error)
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
