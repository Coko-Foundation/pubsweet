'use strict'

const User = require('./User')
const Fragment = require('./Fragment')
const Collection = require('./Collection')

const Team = require('./Team')
const Authsome = require('authsome')
const config = require('../../config')

const AuthorizationError = require('../errors/AuthorizationError')

class Authorize {
  static getObject (resource) {
    if (typeof resource === 'string') {
      const object = this.getObjectFromURL(resource)
      return object
    } else {
      return Promise.resolve(resource)
    }
  }

  static getObjectFromURL (resourceUrl) {
    let parts = resourceUrl.split('/')
    if (parts[4] === 'fragments' && parts[5]) {
      // e.g. /api/collections/1/fragments/1
      let id = parts[5]
      return Fragment.find(id)
    } else if (parts[2] === 'collections' && parts[3]) {
      let id = parts[3]
      return Collection.find(id)
    } else if (parts[2] === 'users' && parts[3]) {
      let id = parts[3]
      return User.find(id)
    } else if (parts[2] === 'users') {
      return User.all()
    } else if (parts[2] === 'teams' && parts[3]) {
      let id = parts[3]
      return Team.find(id)
    } else if (parts[2] === 'teams') {
      return Team.all()
    }
  }

  static can (userId, operation, resource) {
    let authsome = new Authsome(
      config.get('authsome.mode'),
      { teams: config.get('authsome.teams') }
    )

    return this.getObject(
      resource
    ).then(
      object => {
        if (userId) {
          // Fetch user and teams
          return Promise.all(
            [object, User.find(userId)]
          ).then(
            ([object, user]) => {
              let teams = user.teams.map((teamId) => Team.find(teamId))
              return Promise.all([object, user, Promise.all(teams)])
            }
          ).then(
            ([object, user, teams]) => {
              user.teams = teams
              return [object, user]
            }
          )
        } else {
          // No user
          return Promise.all([object, Promise.resolve(null)])
        }
      }
    ).then(
      ([object, user]) => {
        return [object, user, authsome.can(user, operation, object)]
      }
    ).then(
      ([object, user, permission]) => {
        if (permission) return permission

        const name = user ? user.username : 'public'
        const permstr = permission ? 'is' : 'is not'
        const msg = `User ${name} ${permstr} allowed to ${operation} ${object.type} ${object.id}`

        throw new AuthorizationError(msg)
      }
    ).catch(
      (err) => {
        throw new AuthorizationError(err.message)
      }
    )
  }
}

module.exports = Authorize
