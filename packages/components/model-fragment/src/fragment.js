const BaseModel = require('@pubsweet/base-model')

class Fragment extends BaseModel {
  constructor(properties) {
    super(properties)
    this.type = 'fragment'
    this.owners = this.owners || []
  }

  static get tableName() {
    return 'fragments'
  }

  static get schema() {
    return {
      required: ['fragmentType'],
      type: 'object',
      properties: {
        fragmentType: { type: 'string' },
        fragments: {
          type: ['array', 'null'],
          items: { type: 'string', format: 'uuid' },
        },
        owners: {
          type: ['array', 'null'],
          items: { type: 'string', format: 'uuid' },
        },
      },
    }
  }

  async delete() {
    const { model: Team } = require('@pubsweet/model-team')
    await Team.deleteAssociated(this.type, this.id)
    return super.delete()
  }
}

Fragment.type = 'fragment'
module.exports = Fragment
