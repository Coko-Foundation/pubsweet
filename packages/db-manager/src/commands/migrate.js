const getUmzug = require('../helpers/umzug')
const getMigrationPaths = require('../helpers/migrationPaths')

const migrate = async options => {
  const { umzug, cleanup } = await getUmzug(getMigrationPaths())
  await umzug.up(options).finally(() => cleanup())
}

module.exports = migrate
