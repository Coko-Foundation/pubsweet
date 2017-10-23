const logger = require('@pubsweet/logger')
const dbExists = require('../helpers/db-exists')
const dbPath = require('../helpers/db-path')
const { validateUser } = require('../validations')

const addAdminOwnerToAllCollections = async user => {
  logger.info('Adding admin owner to collections')
  const Collection = require('pubsweet-server/src/models/Collection')
  const collections = await Collection.all()

  await Promise.all(
    collections.map(data => {
      const collection = new Collection(data)
      collection.setOwners([user.id])
      return collection.save()
    }),
  )
  logger.info(`Successfully added admin owner to collections`)
}

const createUser = async userData => {
  logger.info('Creating user', userData.username)
  const User = require('pubsweet-server/src/models/User')

  const user = new User(userData)
  await user.save()

  if (user.admin) {
    await addAdminOwnerToAllCollections(user)
  }

  logger.info(`Successfully added user: ${user.username}`)
  return user
}

module.exports = async userData => {
  validateUser(userData)
  const exists = await dbExists()
  if (!exists) {
    throw new Error('Cannot create user. No database at:', dbPath())
  }
  return createUser(userData)
}
