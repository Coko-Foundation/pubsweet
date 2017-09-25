const spawn = require('child-process-promise').spawn
const reduce = require('lodash/fp/reduce').convert({cap: false})

const formatOpts = reduce((acc, value, key) => acc.concat(`--${key}`, value), [])

const getEnvWithConfig = (config = {}) => Object.assign(
    {},
    process.env,
    { NODE_CONFIG: JSON.stringify(config) }
  )

const runCommand = async ({ args, options, cwd, nodeConfig, debug }) => {
  const argList = args.split(' ').concat(formatOpts(options))
  return spawn('pubsweet', argList, {
    cwd,
    env: getEnvWithConfig(nodeConfig),
    shell: true,
    capture: [ 'stdout', 'stderr' ]
  })
}

module.exports = {
  formatOpts,
  getEnvWithConfig,
  runCommand
}
