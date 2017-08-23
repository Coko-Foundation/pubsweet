process.env.PUBSWEET_BACKEND_SILENT = true

const colors = require('colors/safe')
const logger = require('pubsweet-logger')

const runPrompt = async ({ properties, override }) => {
  logger.info('Asking for user details')

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

const logInput = result => {
  logger.info('Received the following answers:', result)

  Object.keys(result).forEach(entry => {
    const answer = entry === 'password' ? '<redacted>' : result[entry]
    logger.info(`  ${entry}: ${answer}`)
  })
}

const addAdminOwnerToAllCollections = async user => {
  logger.info('Adding admin owner to collections')

  const Collection = require('pubsweet-server/src/models/Collection')
  const collections = await Collection.all()

  await Promise.all(collections.map(data => {
    const collection = new Collection(data)
    collection.setOwners([user.id])
    return collection.save()
  }))
}

const createUser = async result => {
  logger.info('Creating user', result.username)

  const User = require('pubsweet-server/src/models/User')

  const user = new User(result)
  await user.save()

  if (user.admin) {
    await addAdminOwnerToAllCollections(user)
  }

  return user
}

module.exports = async options => {
  await require('./check-exists')(options.appPath)
  await require('./check-db')(options.appPath)
  await require('./chdir')(options.appPath)

  const result = await runPrompt(options)
  logInput(result)

  const user = await createUser(result)
  logger.info(`Successfully added user: ${user.username}`)
}
