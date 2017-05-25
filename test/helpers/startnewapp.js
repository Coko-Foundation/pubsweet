module.exports = () => require('./working_dir')(
).then(
  require('../../src/generate-env')
).then(
  () => require('../../src/initial-app')('someapp')
).then(
  require('../../src/setup-db')({
    properties: require('../../src/db-properties'),
    override: require('../fixtures').dbconfig
  })
).then(
  dbsetup => new Promise(
    resolve => require('../../src/start')(server => {
      resolve({
        server: server,
        user: dbsetup.user,
        collection: dbsetup.collection
      })
    })
  )
)
