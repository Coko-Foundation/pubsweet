const request = require('supertest')
const api = require('../../src')()
const STATUS = require('http-status-codes')
const isString = require('lodash/isString')

const COLLECTIONS_ROOT = '/api/collections/'

const authorizedRequest = (req, token) => {
  if (token) {
    req.set('Authorization', 'Bearer ' + token)
  }

  return req
}

// TODO: standardise parameter order of the "fragments" methods below

const fragments = {
  post: (fragment, collection, token) => {
    const collectionId = isString(collection) ? collection : collection.id

    const req = request(
      api
    ).post(
      '/api/collections/' + collectionId + '/fragments'
    ).send(
      fragment
    )

    return token ? req.set(
      'Authorization', 'Bearer ' + token
    ) : req
  },
  patch: (fragmentId, update, collection, token) => {
    const req = request(
      api
    ).patch(
      '/api/collections/' + collection.id + '/fragments/' + fragmentId
    ).send(
      update
    )

    return token ? req.set(
      'Authorization', 'Bearer ' + token
    ) : req
  },
  get: (collection, token, fragmentId) => {
    let url = `/api/collections/${collection.id}/fragments`
    if (fragmentId) url += '/' + fragmentId

    const req = request(api).get(url)

    return token ? req.set(
      'Authorization', 'Bearer ' + token
    ) : req
  }
}

const users = {
  authenticate: {
    post: (user, opts = {}) => {
      let expect = opts.expect === undefined ? true : opts.expect
      let token = opts.token === undefined ? true : opts.token

      let req = request(
        api
      ).post(
        '/api/users/authenticate'
      ).send(
        {
          username: user.username,
          password: user.password
        }
      )

      if (expect) {
        req = req.expect(
          STATUS.CREATED
        )
      }

      if (token) {
        return req.then(
          res => res.body.token
        )
      } else {
        return req
      }
    }
  },
  post: user => {
    return request(
      api
    ).post(
      '/api/users'
    ).send(
      user
    )
  },
  put: (userId, user, token) => {
    const req = request(
      api
    ).put(
      `/api/users/${userId}`
    ).send(
      user
    )

    return token ? req.set(
      'Authorization', 'Bearer ' + token
    ) : req
  },
  get: (userId, token) => {
    const url = `/api/users${userId ? `/${userId}` : ''}`

    const req = request(
      api
    ).get(
      url
    )

    return token ? req.set(
      'Authorization', 'Bearer ' + token
    ) : req
  },
  del: (userId, token) => {
    const req = request(
      api
    ).delete(
      `/api/users/${userId}`
    )

    return token ? req.set(
      'Authorization', 'Bearer ' + token
    ) : req
  }
}

const collections = {
  list: (token) => {
    const req = request(api).get(COLLECTIONS_ROOT)
    return authorizedRequest(req, token)
  },
  create: (collection, token) => {
    const req = request(api).post(COLLECTIONS_ROOT)
      .send(collection)
    return authorizedRequest(req, token)
  },
  retrieve: (collectionId, token) => {
    const req = request(api).get(COLLECTIONS_ROOT + collectionId)
    return authorizedRequest(req, token)
  },
  update: (collectionId, patch, token) => {
    const req = request(api).patch(COLLECTIONS_ROOT + collectionId)
      .send(patch)
    return authorizedRequest(req, token)
  },
  delete: (collectionId, token) => {
    const req = request(api).delete(COLLECTIONS_ROOT + collectionId)
    return authorizedRequest(req, token)
  },
  listFragments: (collectionId, token) => {
    const req = request(api).get(COLLECTIONS_ROOT + collectionId + '/fragments')
    return authorizedRequest(req, token)
  },
  createFragment: (collectionId, fragment, token) => {
    const req = request(api).post(COLLECTIONS_ROOT + collectionId + '/fragments')
      .send(fragment)
    return authorizedRequest(req, token)
  },
  retrieveFragment: (collectionId, fragmentId, token) => {
    const req = request(api).get(COLLECTIONS_ROOT + collectionId + '/fragments/' + fragmentId)
    return authorizedRequest(req, token)
  },
  updateFragment: (collectionId, fragmentId, patch, token) => {
    const req = request(api).patch(COLLECTIONS_ROOT + collectionId + '/fragments/' + fragmentId)
      .send(patch)
    return authorizedRequest(req, token)
  },
  deleteFragment: (collectionId, fragmentId, token) => {
    const req = request(api).delete(COLLECTIONS_ROOT + collectionId + '/fragments/' + fragmentId)
    return authorizedRequest(req, token)
  }
}

const teams = {
  get: (token, collection) => {
    const collectionId = () => {
      return isString(collection) ? collection : collection.id
    }
    const collectionpart = collection ? `/collections/${collectionId()}` : ''

    const url = `/api${collectionpart}/teams`

    return request(
      api
    ).get(
      url
    ).set(
      'Authorization', 'Bearer ' + token
    )
  },
  post: (team, collection, token) => {
    const collectionId = () => {
      return isString(collection) ? collection : collection.id
    }
    const collectionpart = collection ? `/collections/${collectionId()}` : ''

    const url = `/api${collectionpart}/teams`

    return request(
      api
    ).post(
      url
    ).send(
      team
    ).set(
      'Authorization', 'Bearer ' + token
    )
  },
  put: (team, collection, teamId, token) => {
    const collectionId = () => {
      return isString(collection) ? collection : collection.id
    }
    const collectionpart = collection ? `/collections/${collectionId()}` : ''
    const teampart = teamId ? `/${teamId}` : ''

    const url = `/api${collectionpart}/teams${teampart}`

    return request(
      api
    ).put(
      url
    ).send(
      team
    ).set(
      'Authorization', 'Bearer ' + token
    )
  }
}

const upload = {
  post: (file) => {
    return request(
      api
    ).post(
      '/api/upload'
    ).attach(
      'file', file
    )
  },
  get: (path) => {
    return request(
      api
    ).get(
      path
    )
  }
}

module.exports = {
  fragments: fragments,
  users: users,
  collections: collections,
  teams: teams,
  upload: upload
}
