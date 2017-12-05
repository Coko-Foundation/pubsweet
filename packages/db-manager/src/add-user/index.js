const logger = require('@pubsweet/logger')
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

module.exports = async userData => {
  validateUser(userData)

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
