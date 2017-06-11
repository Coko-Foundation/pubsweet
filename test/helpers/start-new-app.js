// TODO: not used?

module.exports = async () => {
  await require('./working-dir')()
  await require('../../src/generate-env')()
  await require('../../src/initial-app')('someapp')

  const { user, collection } = await require('../../src/setup-db')({
    properties: require('../../src/db-properties'),
    override: require('../fixtures').dbconfig
  })

  return new Promise(resolve => {
    const cb = server => resolve({server, user, collection})

    return require('../../src/start')(cb)
  })
}
