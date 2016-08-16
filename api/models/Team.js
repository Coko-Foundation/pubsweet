'use strict'

const Model = require('./Model')
const User = require('./User')
const logger = require('../logger')

class Team extends Model {
  constructor (properties) {
    super(properties)

    this.type = 'team'
    this.name = properties.name
    this.teamType = properties.teamType
    this.object = properties.object

    if (!Array.isArray(this.members)) {
      this.members = []
    }
  }

  updateProperties (properties) {
    let currentMembers = new Set(this.members)
    let newMembers = new Set(properties.members)
    let removedMembers = new Set([...currentMembers].filter(x => !newMembers.has(x)))
    logger.info('x9 NEW PROPERTIES', properties)
    logger.info('x8', newMembers)
    logger.info('x5', removedMembers)

    let removes = [...removedMembers].map(userId => {
      return User.find(userId).then(user => {
        user.teams = user.teams.filter(teamId => teamId !== this.id)
        logger.info('x6', user.teams)
        return user.save()
      })
    })

    return Promise.all(removes).then(() => this._superUpdateProperties(properties))
  }

  _superUpdateProperties (properties) {
    return super.updateProperties(properties)
  }
  _superSave () {
    return super.save()
  }

  save () {
    let members = this.members.map(function (member) {
      return User.find(member).then(function (user) {
        if (!(user.teams).includes(this.id)) {
          user.teams.push(this.id)
          return user.save()
        }
      }.bind(this))
    }.bind(this))

    return Promise.all(members).then(members => this._superSave())
  }
}

Team.type = 'team'
module.exports = Team
