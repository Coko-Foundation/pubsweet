const BaseModel = require('../../../src')

class Manuscript extends BaseModel {
  static get tableName() {
    return 'manuscripts'
  }

  constructor(properties) {
    super(properties)
    this.type = 'manuscript'
    this.owners = this.owners || []
  }

  static get schema() {
    return {
      properties: {
        title: { type: 'string' },
        content: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        owners: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
        },
      },
      additionalProperties: false,
    }
  }

  static get relationMappings() {
    return {
      teams: {
        relation: BaseModel.HasManyRelation,
        modelClass: require.resolve('@pubsweet/model-team/src/team'),
        beforeInsert(model) {
          model.objectType = 'Manuscript'
        },
        filter: { objectType: 'Manuscript' },
        join: {
          from: 'manuscripts.id',
          to: 'teams.objectId',
        },
      },
    }
  }

  async $beforeDelete() {
    return this.$relatedQuery('teams').delete()
  }
}

module.exports = Manuscript
