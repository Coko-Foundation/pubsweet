const logger = require('@pubsweet/logger')
const config = require('config')
const userData = config.get('dbManager.user')
const collectionTitle = config.get('dbManager').collection

const createAdminUser = async () => {
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

const createCollection = async (user) => {
  const Collection = require('pubsweet-server/src/models/Collection')
  logger.info('Creating the initial collection')

  const collection = new Collection({ title: collectionTitle, created: Date.now() })
  collection.setOwners([user.id])
  await collection.save()

  logger.info('Created initial collection: ', collection.title)

  return collection
}

module.exports = async () => {
  logger.info('Setting up the database')
  const user = await createAdminUser()
  const collection = collectionTitle ? await createCollection(user) : null
  logger.info('Finished setting up the database')
  return {user, collection}
}
