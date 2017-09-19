const logger = require('@pubsweet/logger')
const config = require('config')
const Collection = require('pubsweet-server/src/models/Collection')
const User = require('pubsweet-server/src/models/User')
const dbExists = require('../helpers/db-exists')

const addAdminOwnerToAllCollections = async user => {
  logger.info('Adding admin owner to collections')

  const collections = await Collection.all()

  await Promise.all(collections.map(data => {
    const collection = new Collection(data)
    collection.setOwners([user.id])
    return collection.save()
  }))
}

const createUser = async userData => {
  logger.info('Creating user', userData.username)

  const user = new User(userData)
  await user.save()

  if (user.admin) {
    await addAdminOwnerToAllCollections(user)
  }

  logger.info(`Successfully added user: ${user.username}`)
  return user
}

module.exports = async (dbPath) => {
  const exists = await dbExists(dbPath)
  const userData = config.get('dbManager.user')
  if (!exists) {
    throw new Error('Cannot create user. No database at:', dbPath)
  }
  return await createUser(userData)
}
