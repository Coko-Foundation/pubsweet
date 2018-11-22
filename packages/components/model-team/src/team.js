const _ = require('lodash')
const logger = require('@pubsweet/logger')

const BaseModel = require('@pubsweet/base-model')

class Team extends BaseModel {
  constructor(properties) {
    super(properties)

    this.type = 'team'

    if (!Array.isArray(this.members)) {
      this.members = []
    }
  }

  static get tableName() {
    return 'teams'
  }

  static get schema() {
    return {
      properties: {
        object: { type: ['object', 'null'] },
        name: { type: 'string' },
        teamType: { type: ['string'] },
        members: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
        },
        owners: {
          type: ['array', 'null'],
          items: { type: 'string', format: 'uuid' },
        },
        global: { type: ['boolean', 'null'] },
      },
    }
  }

  static async deleteAssociated(type, id) {
    const teams = await Team.all()

    return Promise.all(
      teams
        .filter(
          team =>
            team.object && team.object.type === type && team.object.id === id,
        )
        .map(team => team.delete()),
    )
  }

  async updateProperties(properties) {
    const { model: User } = require('@pubsweet/model-user')

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
    let team

    try {
      team = await super.save()

      const { model: User } = require('@pubsweet/model-user')

      await Promise.all(
        team.members.map(async member => {
          const user = await User.find(member)
          if (!user.teams.includes(team.id)) {
            user.teams.push(team.id)
            await user.save()
          }
        }),
      )
    } catch (e) {
      logger.error(e)
    }
    return team
  }

  async delete() {
    const { model: User } = require('@pubsweet/model-user')

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
