const path = require('path')

module.exports = opts => async () => {
  await require('../src/check-no-app')(opts)()
  await require('../src/chdir')(opts.appPath)()
  await require('../src/generate-config')()
  await require('../src/generate-env')()
  await require('../src/initial-app')(opts.appPath)
  require('../src/load-config')(path.resolve('', './config'))
  await require('../src/setup-db')(opts)
}
