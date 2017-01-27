'use strict'

// This module is used for communicating validation requirements to the
// frontend

const Fragment = require('./Fragment')
const Collection = require('./Collection')
const User = require('./User')
const Team = require('./Team')

let validations = {
  fragment: Fragment.validations(),
  collection: Collection.validations(),
  user: User.validations(),
  team: Team.validations()
}

module.exports = validations
