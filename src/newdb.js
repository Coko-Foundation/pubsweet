const path = require('path')

module.exports = opts => async () => {
  await require('../src/check-exists')(opts.appPath)()
  await require('../src/check-no-db')(opts)()
  await require('../src/chdir')(opts.appPath)()
  await require('../src/generate-config')()
  await require('../src/generate-env')()
  require('../src/load-config')(path.resolve('', './config'))
  await require('../src/setup-db')(opts)
}
