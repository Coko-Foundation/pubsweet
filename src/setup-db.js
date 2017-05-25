process.env.PUBSWEET_BACKEND_SILENT = true

const colors = require('colors/safe')
const logger = require('./logger')
const serverPath = require('./server-path')

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
  logger.info(results)
  logger.info('Received the following answers:')

  Object.keys(results).forEach(key => {
    const answer = key === 'password' ? '<redacted>' : results[key]
    logger.info(`  ${key}: ${answer}`)
  })
}

const createUser = async data => {
  const User = require(`${serverPath()}/src/models/User`)

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
  const Collection = require(`${serverPath()}/src/models/Collection`)

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
    const user = await createUser(result)

    // create initial collection, if specified
    const collection = result.collection ? createCollection(result.collection, user) : null

    return { user, collection }
  } catch (e) {
    logger.error('database setup failed')
    throw e
  }
}
