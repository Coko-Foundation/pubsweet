const spawn = require('child-process').spawn
const path = require('path')

module.exports = () => require('pubsweet/test/helpers/working_dir')(
).then(
  dir => require('pubsweet/src/generate-config')()
).then(
  require('pubsweet/src/generate-env')
).then(
  () => require('pubsweet/src/initial-app')('someapp')
).then(
  require('pubsweet/src/setup-db')({
    properties: require('pubsweet/src/db-properties'),
    override: require('pubsweet/test/fixtures').dbconfig
  })
).then(
  dbsetup => new Promise(
    (resolve, reject) => spawn(
      'npm install',
      [path.join(__dirname, '..', '..')],
      {
        cwd: process.cwd(),
        stdio: 'ignore',
        shell: true
      }
    ).then(
      () => resolve(dbsetup)
    ).catch(
      reject
    )
  )
).then(
  dbsetup => new Promise(
    resolve => require('pubsweet/test/src/start')(server => {
      resolve({
        server: server,
        user: dbsetup.user,
        collection: dbsetup.collection
      })
    })
  )
)
