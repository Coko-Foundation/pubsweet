'use strict'
const Base = require('./base').Base
const db = require('./base').db
const Role = require('./role')

class User extends Base {
  constructor (properties) {
    super()
    this.type = 'user'
    this.email = properties.email
    this.password = properties.password // Bad, m'kay.
    this.username = properties.username
  }

  validPassword (password) {
    if (this.password === password) {
      return true
    } else {
      return false
    }
  }

  addRole (role) {
    return Role.addUserRoles(this.username, 'admin')
  }

  static findByEmail (email) {
    return db.createIndex({
      index: {
        fields: ['email', 'type']
      }
    }).then(function (result) {
      console.log(result)
      return db.find({selector: {
        type: 'user',
        email: email
      }}).then(function (user) {
        return new this(user)
      })
    }).catch(function (err) {
      console.error(err)
    })
  }


}

User.type = 'user'

module.exports = User
