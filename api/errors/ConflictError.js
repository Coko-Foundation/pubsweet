'use strict'

class ConflictError extends Error {
  constructor (message, status) {
    super(message)
    Error.captureStackTrace(this, 'ConflictError')
    this.name = 'ConflictError'
    this.message = message
    this.status = status || 409
  }
}

module.exports = ConflictError
