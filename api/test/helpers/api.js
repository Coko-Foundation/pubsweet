const request = require('supertest-as-promised')
const api = require('../../api')
const STATUS = require('http-status-codes')

const fragments = {
  post: (fragment, collection, token) => {
    const req = request(
      api
    ).post(
      '/api/collections/' + collection.id + '/fragments'
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
    let url = '/api/collections/' + collection.id + '/fragments'
    if (fragmentId) url += '/' + fragmentId

    const req = request(api).get(url)

    return token ? req.set(
      'Authorization', 'Bearer ' + token
    ) : req
  }
}

const users = {
  authenticate: {
    post: (user) => {
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
    },
    get: () => {

    }
  }
}

const collections = {

}

const teams = {
  get: (token) => {
    return request(
      api
    ).get(
      '/api/teams'
    ).set(
      'Authorization', 'Bearer ' + token
    )
  },
  post: (team, collection, token) => {
    const req = request(api)

    return (collection ? req.post(
        `/api/collections/${collection.id}/teams`
      ) : req.post(
        '/api/teams'
      )
    ).send(
      team
    ).set(
      'Authorization', 'Bearer ' + token
    )
  }
}

module.exports = {
  fragments: fragments,
  users: users,
  collections: collections,
  teams: teams
}
