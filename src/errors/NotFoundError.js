'use strict'

class NotFoundError extends Error {
  constructor (message, status) {
    super(message)
    Error.captureStackTrace(this, 'NotFoundError')
    this.name = 'NotFoundError'
    this.message = message || 'Not found'
    this.status = status || 404
  }
}

module.exports = NotFoundError
