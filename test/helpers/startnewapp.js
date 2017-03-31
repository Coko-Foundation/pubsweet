const spawn = require('child_process').spawnSync
const path = require('path')
const fs = require('fs-extra')

const run = async () => {
  const tmpdir = await require('pubsweet-cli/test/helpers/working_dir')()

  const appname = 'testapp'
  fs.mkdirsSync(path.join(tmpdir, appname))
  console.log('created directory')

  await require('pubsweet-cli/src/generate-config')()
  console.log('config generated')

  await require('pubsweet-cli/src/generate-env')()
  console.log('env generated')

  await require('pubsweet-cli/src/initial-app')(appname)
  console.log('app generated')

  const app = await require('pubsweet-cli/src/setup-db')({
    properties: require('pubsweet-cli/src/db-properties'),
    override: require('pubsweet-cli/test/fixtures').dbconfig
  })
  console.log('db created')

  require('pubsweet-cli/src/load-config')(path.resolve('', './config'))
  console.log('config loaded')

  spawn(
    'npm install',
    [path.join(__dirname, '..', '..')],
    {
      cwd: process.cwd(),
      stdio: 'ignore',
      shell: true
    }
  )

  console.log('starting server')
  return new Promise(resolve => {
    require('pubsweet-cli/src/start')(() => resolve(app))
  })
}

module.exports = run
