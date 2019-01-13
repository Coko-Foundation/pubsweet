const STATUS = require('http-status-codes')

class ConflictError extends Error {
  constructor(message, status) {
    super(message)
    Error.captureStackTrace(this, 'ConflictError')
    this.name = 'ConflictError'
    this.message = message
    this.status = status || STATUS.CONFLICT
  }
}

module.exports = ConflictError
