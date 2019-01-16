const BaseModel = require('@pubsweet/base-model')

class TeamMember extends BaseModel {
  // constructor(properties) {
  //   // super(properties)

  //   // this.type = 'team'

  //   // if (!Array.isArray(this.members)) {
  //   //   this.members = []
  //   // }
  // }

  static get tableName() {
    return 'team_members'
  }

  static get schema() {
    return {
      properties: {
        user_id: { type: 'string', format: 'uuid' },
        team_id: { type: 'string', format: 'uuid' },
        status: { type: 'string' },
        global: { type: ['boolean', 'null'] },
      },
    }
  }
}

module.exports = TeamMember
