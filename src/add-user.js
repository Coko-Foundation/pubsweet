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

const maybeaddowner = user => new Promise(
  (resolve, reject) => {
    if (user.admin) {
      const Collection = require(`${backend()}/src/models/Collection`)
      Collection.all().then(
        collections => {
          collections = collections.map(c => {
            let col = new Collection(c)
            col.setOwners([user.id])
            return col.save()
          })
          Promise.all(collections).then(
            () => resolve(user)
          )
        }
      )
    } else {
      resolve(user)
    }
  }
)

const setup = options => {
  const User = require(`${backend()}/src/models/User`)
  const newuser = new User(options)
  return newuser.save().then(maybeaddowner)
}

module.exports = options => () => runPrompt(
  options
).then(
  logResult
).then(
  setup
)
