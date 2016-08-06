'use strict'

const User = require('./User')
const Fragment = require('./Fragment')
const Collection = require('./Collection')

const Team = require('./Team')
const Authsome = require('authsome')
const config = require('../../config')

class Authorize {
  static getObjectFromURL (resourceUrl) {
    let parts = resourceUrl.split('/')

    console.log(parts)
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

  static can (userId, operation, resourceUrl) {
    let authsome = new Authsome('blog', {
      teams: config.teams
    })

    return this.getObjectFromURL(resourceUrl).then(function (object) {
      return object
    }).then(function (object) {
      return Promise.all([object, User.find(userId)])
    }).then(function ([object, user]) {
      return [object, user, authsome.can(user, operation, object)]
    }).then(function ([object, user, permission]) {
      console.log('User', user.username, 'is', (permission ? null : 'not'), 'allowed to', operation, 'on', object.type, object.id)
      return permission
    })
  }
}

module.exports = Authorize
