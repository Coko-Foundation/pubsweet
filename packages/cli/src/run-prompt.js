const { promisify } = require('util')
const colors = require('colors/safe')
const logger = require('@pubsweet/logger')
const _ = require('lodash')

const logInput = result => {
  logger.info('Received the following answers:')

  Object.keys(result).forEach(entry => {
    const answer = entry === 'password' ? '<redacted>' : result[entry]
    logger.info(`  ${entry}: ${answer}`)
  })
}

module.exports = async function runPrompt({ properties, override }) {
  const prompt = require('prompt')
  const promptGet = promisify(prompt.get)
  prompt.override = override
  prompt.message = colors.cyan('question:')
  prompt.delimiter = colors.green('><')
  prompt.start()
  const result = await promptGet({ properties })

  _.each(result, (val, key) => {
    result[key] = val === '' ? undefined : val
  })

  logInput(result)
  return result
}
