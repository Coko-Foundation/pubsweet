'use strict'

const Collection = require('./models/Collection')
const User = require('./models/User')

const logger = require('./logger')

class Setup {
  static async setup (user, collection) {
    logger.info('Starting setup')

    let admin = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      admin: true
    })

    admin = await admin.save()
    logger.info('Created admin user: ', admin)

    collection = new Collection(collection)
    collection.setOwners([admin.id])
    collection = await collection.save()
    logger.info('Created initial collection: ', collection.title)

    return {
      user: admin,
      collection: collection
    }
  }
}

module.exports = Setup
