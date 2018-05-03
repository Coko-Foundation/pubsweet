const logger = require('@pubsweet/logger')
const Collection = require('pubsweet-server/src/models/Collection')

module.exports = async collectionData => {
  logger.info('Creating collection')

  const collection = await new Collection(collectionData).save()
  await collection.save()

  logger.info('Successfully created collection')

  return collection
}
