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

  async $beforeDelete() {
    const { model: Team } = require('@pubsweet/model-team')

    await Team.deleteAssociated(this.type, this.id)
  }
}

Manuscript.type = 'manuscript'
module.exports = Manuscript
