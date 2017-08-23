process.env.PUBSWEET_BACKEND_SILENT = true

const colors = require('colors/safe')
const logger = require('pubsweet-logger')

const runPrompt = async ({ override, properties }) => {
  const prompt = require('prompt')

  prompt.override = override
  prompt.message = colors.cyan('question:')
  prompt.delimiter = colors.green('><')

  prompt.start()

  return new Promise((resolve, reject) => {
    prompt.get({properties}, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

const logResult = results => {
  logger.info('Received the following answers:', results)

  Object.keys(results).forEach(key => {
    const answer = key === 'password' ? '<redacted>' : results[key]
    logger.info(`  ${key}: ${answer}`)
  })
}

const createAdminUser = async data => {
  logger.info('Creating the admin user')

  const User = require('pubsweet-server/src/models/User')

  // create and save an admin user
  const user = new User({
    username: data.username,
    email: data.email,
    password: data.password,
    admin: true
  })

  await user.save()
  logger.info('Saved admin user: ', user.username)

  user.password = data.password

  return user
}

const createCollection = async (title, user) => {
  logger.info('Creating the initial collection')

  const Collection = require('pubsweet-server/src/models/Collection')

  const created = Date.now()

  // create and save an initial collection
  const collection = new Collection({ title, created })
  collection.setOwners([user.id])

  await collection.save()
  logger.info('Created initial collection: ', collection.title)

  return collection
}

module.exports = async options => {
  try {
    logger.info('Setting up the database')

    // ask the user for input
    const result = await runPrompt(options)

    // log the result
    logResult(result)

    // create initial user
    const user = await createAdminUser(result)

    // create initial collection, if specified
    const collection = result.collection ? await createCollection(result.collection, user) : null

    logger.info('Finished setting up the database')

    // generate the env file when setting up the database
    // TODO: should this be more explicit
    await require('./generate-env')()

    return {user, collection}
  } catch (e) {
    logger.error('database setup failed')
    throw e
  }
}
