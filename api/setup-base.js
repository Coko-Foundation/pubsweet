'use strict'

const Collection = require('./models/Collection')
const User = require('./models/User')

const logger = require('./logger')

class Setup {
  static setup (user, collection) {
    const username = user.username
    const email = user.email
    const password = user.password

    logger.info('Starting setup')

    const newcollection = new Collection(collection)

    return newcollection.save().then(
      (response) => {
        logger.info('Created initial collection: ', collection.title)

        return new User(
          {
            username: username,
            email: email,
            password: password,
            admin: true
          }
        ).save()
      }
    ).then(
      (newuser) => {
        logger.info('Created admin user: ', newuser)
        return {
          user: newuser,
          collection: newcollection
        }
      }
    ).catch(
      (error) => {
        logger.error(error)
      }
    )
  }
}

module.exports = Setup
