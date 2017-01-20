'use strict'

// This module is used for communicating validation requirements to the
// frontend

const Fragment = require('./fragment')
const Collection = require('./collection')
const User = require('./user')
const Team = require('./team')

let validations = {
  fragment: Fragment.validations(),
  collection: Collection.validations(),
  user: User.validations(),
  team: Team.validations()
}

module.exports = validations
