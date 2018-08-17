const program = require('commander')
const db = require('pubsweet-server/src/db')
const { migrate } = require('@pubsweet/db-manager')

module.exports = async (commandArguments = process.argv) => {
  const options = program.parse(commandArguments)
  await migrate(options)

  // drain pool to avoid 10 second delay before command exits
  db.end()
}
