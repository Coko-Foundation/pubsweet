const spawn = require('child_process').spawn
const path = require('path')

module.exports = () => require('pubsweet-cli/test/helpers/working_dir')(
).then(
  dir => require('pubsweet-cli/src/generate-config')()
).then(
  require('pubsweet-cli/src/generate-env')
).then(
  () => require('pubsweet-cli/src/initial-app')('someapp')
).then(
  require('pubsweet-cli/src/setup-db')({
    properties: require('pubsweet-cli/src/db-properties'),
    override: require('pubsweet-cli/test/fixtures').dbconfig
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
    resolve => require('pubsweet-cli/test/src/start')(server => {
      resolve({
        server: server,
        user: dbsetup.user,
        collection: dbsetup.collection
      })
    })
  )
)
