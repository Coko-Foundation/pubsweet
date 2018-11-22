const Model = require('./Model')

class Fragment extends Model {
  constructor(properties) {
    super(properties)
    this.type = 'fragment'
    this.owners = this.owners || []
  }

  async delete() {
    const { model: Team } = require('@pubsweet/model-team')
    await Team.deleteAssociated(this.type, this.id)
    return super.delete()
  }
}

Fragment.type = 'fragment'

module.exports = Fragment
