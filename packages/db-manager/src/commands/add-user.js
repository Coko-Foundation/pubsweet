const logger = require('@pubsweet/logger')
const { Collection, User } = require('@pubsweet/models')
const { validateUser } = require('../validations')

const addAdminOwnerToAllCollections = async user => {
  logger.info('Adding admin owner to collections')
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

  const user = new User(userData)
  await user.save()

  if (user.admin) {
    await addAdminOwnerToAllCollections(user)
  }

  logger.info(`Successfully added user: ${user.username}`)
  return user
}
