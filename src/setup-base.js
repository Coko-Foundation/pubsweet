'use strict'

const Collection = require('./models/Collection')
const User = require('./models/User')

const logger = require('./logger')

class Setup {
  static setup (user, collection) {
    logger.info('Starting setup')

    const admin = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      admin: true
    })

    return admin.save().then(
      (admin) => {
        logger.info('Created admin user: ', admin)
        collection = new Collection(collection)
        collection.setOwners([admin.id])
        return collection.save()
      }
    ).then(
      (collection) => {
        logger.info('Created initial collection: ', collection.title)
        return {
          user: admin,
          collection: collection
        }
      }
    ).catch(
      logger.error
    )
  }
}

module.exports = Setup
