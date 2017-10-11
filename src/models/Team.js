'use strict'

const _ = require('lodash')

const Model = require('./Model')
const User = require('./User')

class Team extends Model {
  constructor (properties) {
    super(properties)

    this.type = 'team'

    if (!Array.isArray(this.members)) {
      this.members = []
    }
  }

  static async deleteAssociated (type, id) {
    const teams = await Team.all()

    return Promise.all(
      teams
        .filter(team => team.object &&
          team.object.type === type &&
          team.object.id === id)
        .map(team => team.delete())
    )
  }

  async updateProperties (properties) {
    let currentMembers = new Set(this.members)
    let newMembers = new Set(properties.members)
    let removedMembers = new Set([...currentMembers].filter(x => !newMembers.has(x)))

    await Promise.all(
      [...removedMembers].map(userId => {
        return User.find(userId).then(user => {
          user.teams = user.teams.filter(teamId => teamId !== this.id)
          return user.save()
        })
      })
    )

    return super.updateProperties(properties)
  }

  async save () {
    await Promise.all(
      this.members.map(member => {
        return User.find(member).then(user => {
          if (!(user.teams).includes(this.id)) {
            user.teams.push(this.id)
            return user.save()
          }
        })
      })
    )

    return super.save()
  }

  async delete () {
    await Promise.all(
      this.members.map(member => {
        return User.find(member).then(user => {
          if (user.teams.includes(this.id)) {
            user.teams = _.without(user.teams, this.id)
            return user.save()
          }
        })
      })
    )

    return super.delete()
  }
}

Team.type = 'team'

module.exports = Team
