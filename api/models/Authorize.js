'use strict'

import User from './User'
import Fragment from './Fragment'
import Collection from './Collection'
import Authsome from 'authsome'
import { teams } from 'config'

import AuthorizationError from '../errors/AuthorizationError'


class Authorize {
  static can (user, operation, object) {
    let authsome = new Authsome('blog', {
      teams: teams
    })

    return authsome.can(user, operation, object)
  }
}

module.exports = Authorize
