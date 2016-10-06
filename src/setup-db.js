const colors = require('colors/safe')
const logger = require('./logger')

const Collection = require('pubsweet-backend/src/models/Collection')
const User = require('pubsweet-backend/src/models/User')

const setup = (user, collection) => {
  logger.info('Starting setup')

  const admin = new User({
    username: user.username,
    email: user.email,
    password: user.password,
    admin: true
  })

  return admin.save().then(
    admin => {
      logger.info('Created admin user: ', admin)
      collection = new Collection(collection)
      collection.setOwners([admin.id])
      return collection.save()
    }
  ).then(
    collection => {
      logger.info('Created initial collection: ', collection.title)
      return {
        user: admin,
        collection: collection
      }
    }
  ).catch(
    err => {
      logger.error(err.stack)
      process.exit(1)
    }
  )
}

module.exports = options => {
  const run = (err, result) => {
    if (err) return logger.error(err)

    logger.info('Received the following answers:')

    for (var entry in result) {
      const answer = entry === 'password' ? '<redacted>' : result[entry]
      logger.info(`  ${entry}: ${answer}`)
    }

    const user = {
      username: result.username,
      email: result.email,
      password: result.password
    }

    setup(
      user, { title: result.collection }
    ).then(
      () => logger.info(colors.rainbow('Your PubSweet is now ready!'))
    ).catch(
      err => {
        logger.error(err.stack)
        process.exit(1)
      }
    )
  }

  const prompt = require('prompt')

  prompt.override = options.override
  prompt.message = colors.cyan('question:')
  prompt.delimiter = colors.green('><')

  prompt.start()
  prompt.get({ properties: options.properties }, run)
}
