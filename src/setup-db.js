process.env.PUBSWEET_BACKEND_SILENT = true

const colors = require('colors/safe')
const logger = require('./logger')
const backend = require('./backend')

const runPrompt = options => new Promise(
  (resolve, reject) => {
    const prompt = require('prompt')

    prompt.override = options.override
    prompt.message = colors.cyan('question:')
    prompt.delimiter = colors.green('><')

    prompt.start()
    prompt.get({ properties: options.properties }, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  }
)

const logResult = result => new Promise(
  resolve => {
    logger.info('Received the following answers:')

    for (const entry in result) {
      const answer = entry === 'password' ? '<redacted>' : result[entry]
      logger.info(`  ${entry}: ${answer}`)
    }

    resolve(result)
  }
)

const prepareEntities = result => {
  const user = {
    username: result.username,
    email: result.email,
    password: result.password,
    admin: true
  }
  const collection = { title: result.collection }
  return Promise.resolve({ user, collection })
}

const setup = options => {
  logger.info('Starting setup')
  const Collection = require(`${backend()}/src/models/Collection`)
  const User = require(`${backend()}/src/models/User`)

  const admin = new User(options.user)

  return admin.save().then(
    admin => {
      logger.info('Created admin user: ', options.user.username)
      let collection = new Collection(options.collection)
      collection.setOwners([admin.id])
      return collection.save()
    }
  ).then(
    collection => {
      logger.info('Created initial collection: ', options.collection.title)
      return {
        user: admin,
        collection: collection
      }
    }
  )
}

module.exports = options => () => runPrompt(
  options
).then(
  logResult
).then(
  prepareEntities
).then(
  setup
)
