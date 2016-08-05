'use strict'

const Model = require('./Model')

class Team extends Model {
  constructor (properties) {
    super(properties)

    this.type = 'team'
    this.name = properties.name
    this.teamType = properties.teamType
    this.object = properties.object
  }
}

module.exports = Team
