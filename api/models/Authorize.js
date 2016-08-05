'use strict'

const User = require('./User')
const Fragment = require('./Fragment')
const Collection = require('./Collection')

const Team = require('./Team')
const Authsome = require('authsome')
const { teams } = require('config')

const AuthorizationError = require('../errors/AuthorizationError')

class Authorize {
  static getObjectFromURL (resourceUrl) {
    let parts = resourceUrl.split('/')

    if (parts[4] === 'fragments' && parts[5]) { // e.g. /api/collections/1/fragments/1
      let id = parts[5]
      return Fragment.find(id)
    } else if (parts[2] === 'collections' && parts[3]) {
      let id = parts[3]
      return Collection.find(id)
    } else if (parts[2] === 'users' && parts[3]) {
      let id = parts[3]
      return User.find(id)
    } else if (parts[2] === 'teams' && parts[3]) {
      let id = parts[3]
      return Team.find(id)
    }
  }

  static * can (userId, operation, resourceUrl) {
    let authsome = new Authsome('blog', {
      teams: teams
    })

    let object = yield this.getObjectFromURL(resourceUrl)
    let user = yield User.find(userId)
    let permission = authsome.can(user, operation, object)

    if (permission) {
      return Promise.resolve(true)
    } else {
      throw new AuthorizationError(
        'User ' + user.username + 'is not allowed to ' + operation + 'on ' + object.type + ' ' + object.id
      )
    }
  }
}

module.exports = Authorize
