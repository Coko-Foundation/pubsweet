const logger = require('@pubsweet/logger')
const { Collection, User } = require('pubsweet-server')

module.exports = async (collectionData, fragment = null) => {
  logger.info('Creating collection')

  const collection = await new Collection(collectionData).save()
  const [user] = await User.all()

  if (user) collection.setOwners([user.id])
  await collection.save()

  if (fragment) collection.addFragment(fragment)
  await collection.save()

  logger.info(
    `Successfully created collection ${
      user ? `and set ${user.id} as owner` : 'with no owner'
    }`,
  )

  return collection
}
