'use strict'

const _ = require('lodash')

const Model = require('./Model')
const User = require('./User')
const logger = require('../logger')

class Team extends Model {
  constructor (properties) {
    super(properties)

    this.type = 'team'

    if (!Array.isArray(this.members)) {
      this.members = []
    }
  }

  updateProperties (properties) {
    let currentMembers = new Set(this.members)
    let newMembers = new Set(properties.members)
    let removedMembers = new Set([...currentMembers].filter(x => !newMembers.has(x)))

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

  _superDelete () {
    return super.delete()
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

  delete () {
    let members = this.members.map(function (member) {
      return User.find(member).then(function (user) {
        if (user.teams.includes(this.id)) {
          user.teams = _.without(user.teams, this.id)
          return user.save()
        }
      }.bind(this))
    }.bind(this))

    return Promise.all(members).then(members => this._superDelete())
  }
}

Team.type = 'team'
module.exports = Team
