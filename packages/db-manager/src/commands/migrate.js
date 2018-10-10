const getUmzug = require('../helpers/umzug')
const getMigrationPaths = require('../helpers/migrationPaths')

const migrate = async () => {
  const umzug = await getUmzug(getMigrationPaths())
  await umzug.up()
}

module.exports = migrate
