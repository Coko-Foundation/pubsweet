const logger = require('@pubsweet/logger')
const _ = require('lodash/fp')

const createAdminUser = async userData => {
  const User = require('pubsweet-server/src/models/User')
  logger.info('Creating the admin user')

  userData.admin = true
  const user = new User(userData)
  await user.save()

  logger.info('Saved admin user:', user.username)

  user.password = userData.password
  return user
}

module.exports = async mergedDbConfig => {
  const userData = _.pick(
    ['username', 'password', 'admin', 'email'],
    mergedDbConfig,
  )
  logger.info('Setting up the database')
  const user = await createAdminUser(userData)
  logger.info('Finished setting up the database')
  return { user }
}
