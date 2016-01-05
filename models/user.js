'use strict'
const Base = require('./base').Base
const db = require('./base').db

class User extends Base {
  constructor (properties) {
    super()
    this.properties = properties
  }

  validPassword (password) {
    if (this.password === password) {
      return true
    } else {
      return false
    }
  }

  static findByEmail (email) {
    return db.createIndex({
      index: {
        fields: ['email', 'type']
      }
    }).then(function (result) {
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

module.exports = User
