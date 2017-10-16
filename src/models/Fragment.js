'use strict'
const Model = require('./Model')
const Team = require('./Team')

class Fragment extends Model {
  constructor (properties) {
    super(properties)
    this.type = 'fragment'
    this.title = properties.title
  }

  async delete () {
    await Team.deleteAssociated(this.type, this.id)
    return super.delete()
  }
}

Fragment.type = 'fragment'

module.exports = Fragment
