/* eslint-disable func-names-any */

function Team(properties) {
  this.teamType = properties.teamType
  this.group = properties.group
  this.name = properties.name
  this.object = properties.object
  this.members = properties.members
}

Team.prototype.save = jest.fn(function saveTeam() {
  this.id = '111222'
  return Promise.resolve(this)
})

module.exports = Team
