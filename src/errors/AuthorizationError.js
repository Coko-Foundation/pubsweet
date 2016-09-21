'use strict'

class AuthorizationError extends Error {
  constructor (message, status) {
    super(message)
    Error.captureStackTrace(this, 'AuthorizationError')
    this.name = 'AuthorizationError'
    this.message = message
    this.status = status || 403
  }
}

module.exports = AuthorizationError
