'use strict'

const User = require('./User')
const Fragment = require('./Fragment')
const Collection = require('./Collection')

const Team = require('./Team')
const Authsome = require('authsome')
const config = require('../../config')
const logger = require('../logger')

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
    } else if (parts[2] === 'teams') {
      return Team.all()
    }
  }

  static can (userId, operation, resourceUrl) {
    let authsome = new Authsome(config.authsome.mode, {
      teams: config.authsome.teams
    })

    return this.getObjectFromURL(resourceUrl).then(function (object) {
      return object
    }).then(function (object) {
      return Promise.all([object, User.find(userId)])
    }).then(function ([object, user]) {
      let teams = user.teams.map(function (teamId) {
        return Team.find(teamId)
      })
      logger.info('x1', teams)
      return Promise.all([object, user, Promise.all(teams)])
    }).then(function ([object, user, teams]) {
      logger.info('x2', teams)
      user.teams = teams
      return [object, user]
    }).then(function ([object, user]) {
      logger.info('x3', user)
      logger.info('x4', object)

      return [object, user, authsome.can(user, operation, object)]
    }).then(function ([object, user, permission]) {
      logger.info(
        'User', user.username, (permission ? 'is' : 'is not'),
        'allowed to', operation, 'on', object.type, object.id
      )
      if (permission) {
        return permission
      } else {
        throw new AuthorizationError()
      }
    })
  }
}

module.exports = Authorize
