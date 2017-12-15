const STATUS = require('http-status-codes')

class NotFoundError extends Error {
  constructor(message, status) {
    super(message)
    Error.captureStackTrace(this, 'NotFoundError')
    this.name = 'NotFoundError'
    this.message = message || 'Not found'
    this.status = status || STATUS.NOT_FOUND
  }
}

module.exports = NotFoundError
