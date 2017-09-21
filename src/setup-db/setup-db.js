const logger = require('@pubsweet/logger')
const config = require('config')
const _ = require('lodash/fp')

const createAdminUser = async (userData) => {
  const User = require('pubsweet-server/src/models/User')
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
  const Collection = require('pubsweet-server/src/models/Collection')
  logger.info('Creating the initial collection')

  const collection = new Collection({ title, created: Date.now() })
  collection.setOwners([user.id])
  await collection.save()

  logger.info('Created initial collection: ', collection.title)

  return collection
}

module.exports = async (setupDbConfig) => {
  const mergedDbConfig = _.merge({}, config.get('dbManager'), setupDbConfig)
  const collectionTitle = mergedDbConfig.collection
  const userData = mergedDbConfig.user
  logger.info('Setting up the database')
  const user = await createAdminUser(userData)
  const collection = collectionTitle ? await createCollection(collectionTitle, user) : null
  logger.info('Finished setting up the database')
  return {user, collection}
}
