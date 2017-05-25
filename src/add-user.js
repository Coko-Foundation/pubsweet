process.env.PUBSWEET_BACKEND_SILENT = true

const colors = require('colors/safe')
const logger = require('./logger')
const serverpath = require('./server-path')

const runPrompt = async ({ properties, override }) => {
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
  logger.info('Received the following answers:')

  Object.keys(result).forEach(entry => {
    const answer = entry === 'password' ? '<redacted>' : result[entry]
    logger.info(`  ${entry}: ${answer}`)
  })
}

const logResult = result => {
  logger.info(`Successfully added user: ${result.username}`)
}

const addAdminOwnerToAllCollections = async user => {
  const Collection = require(`${serverpath()}/src/models/Collection`)
  const collections = await Collection.all()

  await Promise.all(collections.map(data => {
    const collection = new Collection(data)
    collection.setOwners([user.id])
    return collection.save()
  }))
}

const createUser = async result => {
  const User = require(`${serverpath()}/src/models/User`)

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
  logResult(user)
}
