const spawn = require('child-process-promise').spawn
const reduce = require('lodash/fp/reduce').convert({cap: false})

const getMockArgv = ({ args, options }) => ['mock/exec/path', 'mock/file/path']
  .concat(args ? args.split(' ') : [], formatOpts(options))

const formatOpts = reduce((acc, value, key) => acc.concat(`--${key}`, value), [])

const getEnvWithConfig = (config = {}) => Object.assign(
    {},
    process.env,
    { NODE_CONFIG: JSON.stringify(config) }
  )

const runCommand = async ({ args, options, cwd, nodeConfig, stdio }) => {
  const argList = args.split(' ').concat(formatOpts(options))
  return spawn('pubsweet', argList, {
    cwd,
    stdio,
    env: getEnvWithConfig(nodeConfig),
    shell: true,
    capture: [ 'stdout', 'stderr' ]
  })
}

module.exports = {
  getMockArgv,
  formatOpts,
  getEnvWithConfig,
  runCommand
}
