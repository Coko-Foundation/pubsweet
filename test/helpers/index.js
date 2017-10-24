const spawnSync = require('child_process').spawnSync
const spawn = require('child_process').spawn
const path = require('path')
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

const runCommandSync = ({ args, options, cwd, nodeConfig, stdio }) => {
  const { stdout, stderr } = spawnSync(path.resolve('bin/pubsweet.js'), joinArgsAndOpts(args, options), {
    cwd,
    stdio,
    env: getEnvWithConfig(nodeConfig),
    shell: true
  })
  return ({ stdout: stdout ? stdout.toString() : null, stderr: stderr ? stderr.toString() : null })
}

const runCommandAsync = ({ args, options, cwd, nodeConfig, stdio }) => {
  return spawn('pubsweet', joinArgsAndOpts(args, options), {
    cwd,
    stdio,
    env: getEnvWithConfig(nodeConfig),
    shell: true
  })
}

module.exports = {
  getMockArgv,
  runCommandSync,
  runCommandAsync
}
