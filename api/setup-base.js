'use strict'

// const config = require('../config')
const Collection = require('./models/Collection')
const User = require('./models/User')

class Setup {
  static setup (username, email, password, collectionTitle) {
    console.log('Starting setup')
    return new User({
      username: username,
      email: email,
      password: password,
      admin: true
    }).save().then(admin => {
      console.log('Created admin user: ', admin)
      let collection = new Collection({title: collectionTitle})
      collection.setOwners([admin.id])
      return collection.save()
    }).then(
      collection => console.log('Created initial collection: ', collection)
    ).catch(
      error => console.error(error)
    )
  }
}

module.exports = Setup
