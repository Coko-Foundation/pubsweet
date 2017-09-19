const User = require('pubsweet-server/src/models/User')
const Collection = require('pubsweet-server/src/models/Collection')
const logger = require('@pubsweet/logger')

const createAdminUser = async userData => {
  logger.info('Creating the admin user')

  const user = new User({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    admin: true
  })
  await user.save()

  logger.info('Saved admin user: ', user.username)

  user.password = userData.password
  return user
}

const createCollection = async (title, user) => {
  logger.info('Creating the initial collection')

  const collection = new Collection({ title, created: Date.now() })
  collection.setOwners([user.id])
  await collection.save()

  logger.info('Created initial collection: ', collection.title)

  return collection
}

module.exports = async options => {
    logger.info('Setting up the database')
    const user = await createAdminUser(options)
    const collection = options.collection ? await createCollection(options.collection, user) : null
    logger.info('Finished setting up the database')
    return {user, collection}
}
