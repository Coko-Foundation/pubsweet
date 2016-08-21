'use strict'

// import { includes } from 'lodash'
import config from '../../config' // eslint-disable-line

class AuthHelper {

  static can (user, object, action = '*') {
    return true
  }
}

export default AuthHelper
