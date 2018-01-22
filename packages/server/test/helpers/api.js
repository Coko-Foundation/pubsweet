const request = require('supertest')
const api = require('../../src').configureApp(require('express')())
const STATUS = require('http-status-codes')
const isString = require('lodash/isString')
const querystring = require('querystring')

const COLLECTIONS_ROOT = '/api/collections/'

const authorizedRequest = (req, token) => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`)
  }

  return req
}

// TODO: standardise parameter order of the "fragments" methods below

const fragments = {
  post: (opts = {}) => {
    const { fragment, collection, token } = opts

    let url

    if (collection) {
      const collectionId = isString(collection) ? collection : collection.id
      url = `/api/collections/${collectionId}/fragments`
    } else {
      url = '/api/fragments'
    }

    const req = request(api)
      .post(url)
      .send(fragment)

    return authorizedRequest(req, token)
  },
  patch: (opts = {}) => {
    const { fragmentId, update, token, collection } = opts

    let url
    if (collection) {
      url = `/api/collections/${collection.id}/fragments/${fragmentId}`
    } else {
      url = `/api/fragments/${fragmentId}`
    }

    const req = request(api)
      .patch(url)
      .send(update)

    return authorizedRequest(req, token)
  },
  get: (opts = {}) => {
    const { token, collection, fragmentId } = opts

    let url

    if (collection) {
      url = `/api/collections/${collection.id}/fragments`
    } else {
      url = '/api/fragments'
    }

    if (fragmentId) url += `/${fragmentId}`

    if (opts.fields) {
      url += `?${querystring.stringify({
        fields: opts.fields.join(','),
      })}`
    }

    const req = request(api).get(url)
    return authorizedRequest(req, token)
  },
  delete: (opts = {}) => {
    const { fragmentId, token } = opts
    const req = request(api).delete(`/api/fragments/${fragmentId}`)
    return authorizedRequest(req, token)
  },
  teams: (opts = {}) => {
    const { fragmentId, token } = opts

    const url = `/api/fragments/${fragmentId}/teams`

    const req = request(api).get(url)
    return authorizedRequest(req, token)
  },
}

const users = {
  authenticate: {
    post: (user, opts = {}) => {
      const expect = opts.expect === undefined ? true : opts.expect
      const token = opts.token === undefined ? true : opts.token

      let req = request(api)
        .post('/api/users/authenticate')
        .send({
          username: user.username,
          password: user.password,
        })

      if (expect) {
        req = req.expect(STATUS.CREATED)
      }

      if (token) {
        return req.then(res => res.body.token)
      }
      return req
    },
    get: token => {
      const req = request(api)
        .get('/api/users/authenticate')
        .set('Authorization', `Bearer ${token}`)

      return req
    },
  },
  post: user =>
    request(api)
      .post('/api/users')
      .send(user),
  // deprecated: use patch instead
  put: (userId, user, token) => {
    const req = request(api)
      .put(`/api/users/${userId}`)
      .send(user)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
  patch: (userId, user, token) => {
    const req = request(api)
      .patch(`/api/users/${userId}`)
      .send(user)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
  get: (userId, token) => {
    const url = `/api/users${userId ? `/${userId}` : ''}`

    const req = request(api).get(url)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
  del: (userId, token) => {
    const req = request(api).delete(`/api/users/${userId}`)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
}

const collections = {
  list: (token, query = {}) => {
    const url = COLLECTIONS_ROOT

    if (query.fields) {
      query.fields = query.fields.join(',')
    }

    const req = request(api)
      .get(url)
      .query(query)
    return authorizedRequest(req, token)
  },
  create: (collection, token) => {
    const req = request(api)
      .post(COLLECTIONS_ROOT)
      .send(collection)
    return authorizedRequest(req, token)
  },
  retrieve: (collectionId, token) => {
    const req = request(api).get(COLLECTIONS_ROOT + collectionId)
    return authorizedRequest(req, token)
  },
  update: (collectionId, patch, token) => {
    const req = request(api)
      .patch(COLLECTIONS_ROOT + collectionId)
      .send(patch)
    return authorizedRequest(req, token)
  },
  delete: (collectionId, token) => {
    const req = request(api).delete(COLLECTIONS_ROOT + collectionId)
    return authorizedRequest(req, token)
  },
  listTeams: (collectionId, token) => {
    const req = request(api).get(`${COLLECTIONS_ROOT + collectionId}/teams`)
    return authorizedRequest(req, token)
  },
  listFragments: (collectionId, token, options) => {
    let url = `${COLLECTIONS_ROOT + collectionId}/fragments`

    if (options && options.fields) {
      url += `?${querystring.stringify({
        fields: options.fields.join(','),
      })}`
    }

    const req = request(api).get(url)
    return authorizedRequest(req, token)
  },
  createFragment: (collectionId, fragment, token) => {
    const req = request(api)
      .post(`${COLLECTIONS_ROOT + collectionId}/fragments`)
      .send(fragment)
    return authorizedRequest(req, token)
  },
  retrieveFragment: (collectionId, fragmentId, token) => {
    const req = request(api).get(
      `${COLLECTIONS_ROOT + collectionId}/fragments/${fragmentId}`,
    )
    return authorizedRequest(req, token)
  },
  updateFragment: (collectionId, fragmentId, patch, token) => {
    const req = request(api)
      .patch(`${COLLECTIONS_ROOT + collectionId}/fragments/${fragmentId}`)
      .send(patch)
    return authorizedRequest(req, token)
  },
  deleteFragment: (collectionId, fragmentId, token) => {
    const req = request(api).delete(
      `${COLLECTIONS_ROOT + collectionId}/fragments/${fragmentId}`,
    )
    return authorizedRequest(req, token)
  },
  listFragmentTeams: (collectionId, fragmentId, token) => {
    const req = request(api).get(
      `${COLLECTIONS_ROOT}${collectionId}/fragments/${fragmentId}/teams`,
    )
    return authorizedRequest(req, token)
  },
}

const teams = {
  get: (token, teamId) => {
    const url = `/api/teams/${teamId}`

    return request(api)
      .get(url)
      .set('Authorization', `Bearer ${token}`)
  },
  list: (token, collection) => {
    const collectionId = () =>
      isString(collection) ? collection : collection.id
    const collectionpart = collection ? `/collections/${collectionId()}` : ''

    const url = `/api${collectionpart}/teams`

    return request(api)
      .get(url)
      .set('Authorization', `Bearer ${token}`)
  },
  post: (team, token) => {
    const url = `/api/teams`

    return request(api)
      .post(url)
      .send(team)
      .set('Authorization', `Bearer ${token}`)
  },
  patch: (team, teamId, token) => {
    const teamPart = teamId ? `/${teamId}` : ''
    const url = `/api/teams${teamPart}`

    return request(api)
      .patch(url)
      .send(team)
      .set('Authorization', `Bearer ${token}`)
  },
}

const upload = {
  post: (file, token) => {
    const req = request(api)
      .post('/api/upload')
      .attach('file', file)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
  get: (path, token) => {
    const req = request(api).get(path)

    return token ? req.set('Authorization', `Bearer ${token}`) : req
  },
}

const graphql = {
  query: (query, variables, token) => {
    const req = request(api)
      .post('/graphql')
      .send({ query, variables })
    if (token) req.set('Authorization', `Bearer ${token}`)
    return req
  },
}

module.exports = {
  fragments,
  users,
  collections,
  teams,
  upload,
  graphql,
  api,
}
