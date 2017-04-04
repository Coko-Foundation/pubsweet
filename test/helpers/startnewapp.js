const spawn = require('child_process').spawnSync
const path = require('path')
const fs = require('fs-extra')

const run = async () => {
  const tmpdir = await require('pubsweet/test/helpers/working_dir')()

  const appname = 'testapp'
  fs.mkdirsSync(path.join(tmpdir, appname))
  console.log('created directory')

  await require('pubsweet/src/generate-config')()
  console.log('config generated')

  await require('pubsweet/src/generate-env')()
  console.log('env generated')

  await require('pubsweet/src/initial-app')(appname)
  console.log('app generated')

  const app = await require('pubsweet/src/setup-db')({
    properties: require('pubsweet/src/db-properties'),
    override: require('pubsweet/test/fixtures').dbconfig
  })
  console.log('db created')

  require('pubsweet/src/load-config')(path.resolve('', './config'))
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
    require('pubsweet/src/start')(() => resolve(app))
  })
}

module.exports = run
