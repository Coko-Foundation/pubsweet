const path = require('path')

module.exports = opts => async () => {
  await require('./check-no-app')(opts)()
  await require('./chdir')(opts.appPath)()
  await require('./generate-config')()
  await require('./generate-env')()
  await require('./initial-app')(opts.appPath)
  require('./load-config')(path.resolve('', './config'))
  await require('./setup-db')(opts)
}
