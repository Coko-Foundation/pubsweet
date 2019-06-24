const logger = require('@pubsweet/logger')
const { validateUser } = require('../validations')

module.exports = async userData => {
  const { User } = require('@pubsweet/models')

  validateUser(userData)

  logger.info('Creating user', userData.username)

  const user = new User(userData)
  await user.save()

  logger.info(`Successfully added user: ${user.username}`)
  return user
}
