const logger = require('@pubsweet/logger')
const { spawn } = require('child_process')
const requireRelative = require('require-relative')
const serverCommand = require('./server')

module.exports = async () => {
  logger.info('Starting PubSweet app')

  const pkg = requireRelative('./package.json')
  if (
    pkg.scripts &&
    pkg.scripts.start &&
    pkg.scripts.start !== 'pubsweet start'
  ) {
    logger.info('Using "start" script from app.')
    spawn('npm', ['start'], { stdio: 'inherit' })
  } else {
    logger.info(
      'No "start" script defined in app. Falling back to "pubsweet server" behavior.',
    )
    await serverCommand()
  }
}
