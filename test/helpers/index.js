const spawnSync = require('child_process').spawnSync
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

const runCommand = ({ args, options, cwd, nodeConfig, stdio }) => {
  const { stdout, stderr } = spawnSync('pubsweet', joinArgsAndOpts(args, options), {
    cwd,
    stdio,
    env: getEnvWithConfig(nodeConfig),
    shell: true,
    capture: (stdio === 'inherit') ? undefined : [ 'stdout', 'stderr' ]
  })
  return { stdout: stdout ? stdout.toString() : null, stderr: stderr ? stderr.toString() : null }
}

module.exports = {
  getMockArgv,
  runCommand
}
