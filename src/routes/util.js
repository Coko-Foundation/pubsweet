const pick = require('lodash/pick')
const AuthorizationError = require('../errors/AuthorizationError')

module.exports = {
  authorizationError: (username, operation, object) => {
    username = username || 'public'
    const msg = `User ${username} is not allowed to ${operation} ${object}`
    return new AuthorizationError(msg)
  },

  // Build an object containing only the id
  objectId: object => ({ id: object.id }),

  // Build an object containing only the fields of `output` that were in `input`
  // TODO: build a real diff, in case other fields were updated indirectly?
  buildChangeData: (input, output) => {
    const data = {}

    Object.keys(input).forEach(key => {
      // TODO: compare and only add if changed?
      data[key] = output[key]
    })

    return data
  },

  fieldSelector: req => {
    const fields = req.query.fields ? req.query.fields.split(/\s*,\s*/) : null

    return item => fields ? pick(item, fields.concat('id')) : item
  }
}
