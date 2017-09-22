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
    await this.deleteTeams()
    return super.delete()
  }

  async deleteTeams () {
    const teams = await Team.all()

    return Promise.all(
      teams
        .filter(team => team.object &&
          team.object.type === this.type &&
          team.object.id === this.id)
        .map(team => team.delete())
    )
  }
}

Fragment.type = 'fragment'

module.exports = Fragment
