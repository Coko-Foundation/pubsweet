const request = require('supertest')
const api = require('../../../src')()
const STATUS = require('http-status-codes')
const isString = require('lodash/isString')

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
  put: (fragmentId, update, collection, token) => {
    const req = request(
      api
    ).put(
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
    post: user => {
      return request(
        api
      ).post(
        '/api/users/authenticate'
      ).send(
        {
          username: user.username,
          password: user.password
        }
      ).expect(
        STATUS.CREATED
      ).then(
        res => res.body.token
      )
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
  }
}

module.exports = {
  fragments: fragments,
  users: users,
  collections: collections,
  teams: teams,
  upload: upload
}
