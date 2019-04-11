const BaseModel = require('@pubsweet/base-model')

class TeamMember extends BaseModel {
  static get tableName() {
    return 'team_members'
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: require.resolve('@pubsweet/model-user/src/user'),
        join: {
          from: 'team_members.userId',
          to: 'users.id',
        },
      },
      team: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: require.resolve('./team'),
        join: {
          from: 'team_members.teamId',
          to: 'teams.id',
        },
      },
      alias: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: require.resolve('./alias'),
        join: {
          from: 'team_members.aliasId',
          to: 'aliases.id',
        },
      },
    }
  }

  static get schema() {
    return {
      properties: {
        userId: { type: 'string', format: 'uuid' },
        teamId: { type: 'string', format: 'uuid' },
        aliasId: { type: 'string', format: 'uuid' },
        status: { type: 'string' },
        global: { type: ['boolean', 'null'] },
      },
    }
  }
}

module.exports = TeamMember
