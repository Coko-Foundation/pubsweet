const STATUS = require('http-status-codes')

class AuthorizationError extends Error {
  constructor(message, status) {
    super(message)
    Error.captureStackTrace(this, 'AuthorizationError')
    this.name = 'AuthorizationError'
    this.message = message
    this.status = status || STATUS.FORBIDDEN
  }
}

module.exports = AuthorizationError
