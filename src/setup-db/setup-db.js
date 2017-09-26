const logger = require('@pubsweet/logger')
const _ = require('lodash/fp')

const createAdminUser = async (userData) => {
  const User = require('pubsweet-server/src/models/User')
  logger.info('Creating the admin user')

  userData.admin = true
  const user = new User(userData)
  await user.save()

  logger.info('Saved admin user:', user.username)

  user.password = userData.password
  return user
}

const createCollection = async (title, user) => {
  const Collection = require('pubsweet-server/src/models/Collection')
  logger.info('Creating the initial collection')

  const collection = new Collection({ title, created: Date.now() })
  collection.setOwners([user.id])
  await collection.save()

  logger.info('Created initial collection:', collection.title)

  return collection
}

module.exports = async (mergedDbConfig) => {
  const collectionTitle = mergedDbConfig.collection
  const userData = _.pick(['username', 'password', 'admin', 'email'], mergedDbConfig)
  logger.info('Setting up the database')
  const user = await createAdminUser(userData)
  const collection = collectionTitle ? await createCollection(collectionTitle, user) : null
  logger.info('Finished setting up the database')
  return {user, collection}
}
