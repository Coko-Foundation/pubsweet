'use strict'
const Model = require('./model')
const Role = require('./role')

class User extends Model {
  constructor (properties) {
    super(properties)
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
    return Role.addUserRoles(this.username, role).then(function () {
      return this
    }.bind(this))
  }

  removeRole (role) {
    return Role.removeUserRoles(this.username, role)
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

  static findByUsername (username) {
    return db.createIndex({
      index: {
        fields: ['username', 'type']
      }
    }).then(function (result) {
      console.log(result)
      console.log(username)
      return db.find({selector: {
        type: 'user',
        username: username
      }}).then(function (results) {
        var user = results.docs[0]
        console.log('FindByUsername', user)
        return new this(user)
      }.bind(this))
    }.bind(this)).catch(function (err) {
      console.error('Error', err)
    })
  }
}

User.type = 'user'

module.exports = User
