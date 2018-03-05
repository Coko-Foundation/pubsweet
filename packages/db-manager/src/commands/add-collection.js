const logger = require('@pubsweet/logger')
const Collection = require('pubsweet-server/src/models/Collection')
const User = require('pubsweet-server/src/models/User')

module.exports = async collectionData => {
  logger.info('Creating collection')

  const collection = await new Collection(collectionData).save()
  const [user] = await User.all()

  if (user) collection.setOwners([user.id])
  await collection.save()

  logger.info(
    `Successfully created collection ${
      user ? `and set ${user.id} as owner` : 'with no owner'
    }`,
  )
  return collection
}