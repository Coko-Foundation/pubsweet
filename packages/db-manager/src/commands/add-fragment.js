const logger = require('@pubsweet/logger')
const Fragment = require('pubsweet-server/src/models/Fragment')

module.exports = async fragmentData => {
  const { model: User } = require('@pubsweet/model-user')

  logger.info('Creating fragment')

  const fragment = await new Fragment(fragmentData).save()
  const [user] = await User.all()

  if (user) fragment.setOwners([user.id])
  await fragment.save()

  logger.info(
    `Successfully created fragment ${
      user ? `and set ${user.id} as owner` : 'with no owner'
    }`,
  )
  return fragment
}
