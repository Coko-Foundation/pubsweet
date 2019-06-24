const getUmzug = require('../helpers/umzug')
const logger = require('@pubsweet/logger')

const migrate = async options => {
  const getMigrationPaths = require('../helpers/migrationPaths')
  const { umzug, cleanup } = await getUmzug(getMigrationPaths())

  try {
    await umzug.up(options)
  } catch (e) {
    logger.error('Error while running migrations:', e.message, e.stack)
  } finally {
    cleanup()
  }
}

module.exports = migrate
