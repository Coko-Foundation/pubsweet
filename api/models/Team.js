'use strict'

const Model = require('./Model')
const User = require('./User')

class Team extends Model {
  constructor (properties) {
    super(properties)

    this.type = 'team'
    this.name = properties.name
    this.teamType = properties.teamType
    this.object = properties.object
  }

  save () {
    let members = this.members.map(function (member) {
      return User.find(member).then(function (user) {
        if (!(user.teams).includes(this.id)) {
          user.teams.push(this.id)
          return user.save()
        }
      }.bind(this))
    }.bind(this))

    return Promise.all(members).then(function (members) {
      console.log('HAAAA', members)
      return this._superSave()
    }.bind(this))
  }

  _superSave () {
    return super.save()
  }
}

Team.type = 'team'
module.exports = Team
