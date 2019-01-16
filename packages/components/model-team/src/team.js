const BaseModel = require('@pubsweet/base-model')

class Team extends BaseModel {
  constructor(properties) {
    super(properties)

    this.type = 'team'
  }

  static get tableName() {
    return 'teams'
  }

  static get relationMappings() {
    return {
      members: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: require.resolve('@pubsweet/model-user/src/user'),
        join: {
          from: 'teams.id',
          through: {
            modelClass: require.resolve(
              '@pubsweet/model-team-member/src/team_member',
            ),
            from: 'team_members.team_id',
            to: 'team_members.user_id',
          },
          to: 'users.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        object: { type: ['object', 'null'] },
        name: { type: 'string' },
        role: { type: ['string'] },
        owners: {
          type: ['array', 'null'],
          items: { type: 'string', format: 'uuid' },
        },
        global: { type: ['boolean', 'null'] },
      },
    }
  }
}

Team.type = 'team'

module.exports = Team
