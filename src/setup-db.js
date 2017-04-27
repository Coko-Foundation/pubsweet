process.env.PUBSWEET_BACKEND_SILENT = true

const colors = require('colors/safe')
const logger = require('./logger')
const serverpath = require('./server-path')
const logthrow = require('./error-log-throw')

const runPrompt = options => new Promise((resolve, reject) => {
  const prompt = require('prompt')

  prompt.override = options.override
  prompt.message = colors.cyan('question:')
  prompt.delimiter = colors.green('><')

  prompt.start()
  prompt.get({ properties: options.properties }, (err, result) => {
    if (err) return reject(err)
    resolve(result)
  })
})

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

const prepareEntities = result => new Promise(resolve => {
  const user = {
    username: result.username,
    email: result.email,
    password: result.password,
    admin: true
  }
  const collection = { title: result.collection }
  resolve({ user, collection })
})

const setupModels = options => new Promise((resolve, reject) => {
  logger.info('Setting up DB models in', serverpath())

  const Collection = require(`${serverpath()}/src/models/Collection`)
  const User = require(`${serverpath()}/src/models/User`)

  const admin = new User(options.user)

  const makecollection = admin => {
    logger.info('Saved admin user: ', options.user.username)
    let collection = new Collection(options.collection)
    collection.setOwners([admin.id])
    return collection.save()
  }

  const resolvewithdata = collection => {
    logger.info('Created initial collection: ', collection.title)
    admin.password = options.user.password
    resolve({
      user: admin,
      collection: collection
    })
  }

  admin.save().then(
    makecollection
  ).then(
    resolvewithdata
  ).catch(reject)
})

module.exports = options => {
  logger.info('Setting up the database')

  return runPrompt(
    options
  ).then(
    logResult
  ).then(
    prepareEntities
  ).then(
    setupModels
  ).catch(
    logthrow('database setup failed')
  )
}
