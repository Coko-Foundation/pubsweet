const _ = require('lodash')

const Model = require('./Model')
const User = require('./User')

class Team extends Model {
  constructor(properties) {
    super(properties)

    this.type = 'team'

    if (!Array.isArray(this.members)) {
      this.members = []
    }
  }

  static async deleteAssociated(type, id) {
    const teams = await Team.all()

    return Promise.all(
      teams
        .filter(
          team =>
            team.object &&
            team.object.objectType === type &&
            team.object.objectId === id,
        )
        .map(team => team.delete()),
    )
  }

  async updateProperties(properties) {
    const currentMembers = new Set(this.members)
    const newMembers = new Set(properties.members)
    const removedMembers = new Set(
      [...currentMembers].filter(x => !newMembers.has(x)),
    )

    await Promise.all(
      [...removedMembers].map(userId =>
        User.find(userId).then(user => {
          user.teams = user.teams.filter(teamId => teamId !== this.id)
          return user.save()
        }),
      ),
    )

    return super.updateProperties(properties)
  }

  async save() {
    await super.save()

    await Promise.all(
      this.members.map(async member => {
        const user = await User.find(member)
        if (!user.teams.includes(this.id)) {
          user.teams.push(this.id)
          await user.save()
        }
      }),
    )

    return this
  }

  async delete() {
    await Promise.all(
      this.members.map(async member => {
        const user = await User.find(member)
        if (user.teams.includes(this.id)) {
          user.teams = _.without(user.teams, this.id)
          await user.save()
        }
      }),
    )

    return super.delete()
  }
}

Team.type = 'team'

module.exports = Team
