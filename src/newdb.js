const path = require('path')

module.exports = opts => async () => {
  await require('./check-exists')(opts.appPath)()
  await require('./check-no-db')(opts)()
  await require('./chdir')(opts.appPath)()
  await require('./generate-config')()
  await require('./generate-env')()
  require('./load-config')(path.resolve('', './config'))
  await require('./setup-db')(opts)
}
