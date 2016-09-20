'use strict'

class ValidationError extends Error {
  constructor (message, status) {
    super(message)
    Error.captureStackTrace(this, 'ValidationError')
    this.name = 'ValidationError'
    this.message = message
    this.status = status || 409
  }
}

module.exports = ValidationError
