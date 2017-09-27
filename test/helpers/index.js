const spawn = require('child-process-promise').spawn
const reduce = require('lodash/fp/reduce').convert({cap: false})

const formatOpts = reduce((acc, value, key) => acc.concat(`--${key}`, value), [])
const joinArgsAndOpts = (args, options) => (args ? args.split(' ') : []).concat(formatOpts(options)) 

const getEnvWithConfig = (config = {}) => Object.assign(
    {},
    process.env,
    { NODE_CONFIG: JSON.stringify(config) }
  )

const getMockArgv = ({ args, options }) => ['mock/exec/path', 'mock/file/path']
  .concat(joinArgsAndOpts(args, options))

const runCommand = async ({ args, options, cwd, nodeConfig, stdio }) => {
  return spawn('pubsweet', joinArgsAndOpts(args, options), {
    cwd,
    stdio,
    env: getEnvWithConfig(nodeConfig),
    shell: true,
    capture: [ 'stdout', 'stderr' ]
  })
}

module.exports = {
  getMockArgv,
  runCommand
}
