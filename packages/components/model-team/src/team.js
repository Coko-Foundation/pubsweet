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
        relation: BaseModel.HasManyRelation,
        modelClass: require.resolve('./team_member'),
        join: {
          from: 'teams.id',
          to: 'team_members.teamId',
        },
      },
      users: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: require.resolve('@pubsweet/model-user/src/user'),
        join: {
          from: 'teams.id',
          through: {
            modelClass: require.resolve('./team_member'),
            from: 'team_members.teamId',
            to: 'team_members.userId',
          },
          to: 'users.id',
        },
      },
      aliases: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: require.resolve('./alias'),
        join: {
          from: 'teams.id',
          through: {
            modelClass: require.resolve('./team_member'),
            from: 'team_members.teamId',
            to: 'team_members.aliasId',
          },
          to: 'aliases.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        objectId: { type: ['string', 'null'], format: 'uuid' },
        objectType: { type: ['string', 'null'] },
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
