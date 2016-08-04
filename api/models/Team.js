'use strict'

const Model = require('./Model')

export default class Team extends Model {
  constructor (properties) {
    super(properties)

    this.type = 'team'
    this.name = properties.name
    this.teamType = properties.teamType
    this.object = properties.object
  }
}
