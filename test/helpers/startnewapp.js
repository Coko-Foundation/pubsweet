const spawn = require('child_process').spawnSync
const path = require('path')

const tmpdir = await require('pubsweet-cli/test/helpers/working_dir')()

const appname = 'testapp'
fs.mkdirsSync(path.join(tmpdir, appname))
logger.info('created directory')

await require('pubsweet-cli/src/generate-config')()
logger.info('config generated')

await require('pubsweet-cli/src/generate-env')()
logger.info('env generated')

await require('pubsweet-cli/src/initial-app')(appname)
logger.info('app generated')

await require('pubsweet-cli/src/setup-db')({
  properties: require('pubsweet-cli/src/db-properties'),
  override: dbconfig
})
logger.info('db created')

require('pubsweet-cli/src/load-config')(path.resolve('', './config'))
logger.info('config loaded')

spawn(
  'npm install',
  [path.join(__dirname, '..', '..')],
  {
    cwd: process.cwd(),
    stdio: 'ignore',
    shell: true
  }
)

logger.info('starting server')
require('pubsweet-cli/src/start')(_server => {
  server = _server
  logger.info('server started')
  done()
})
