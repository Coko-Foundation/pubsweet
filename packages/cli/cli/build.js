const program = require('commander')
const { buildProd } = require('../src/startup/')

const readCommand = async argsOverride => {
  program.description('Build assets with webpack')

  return program.parse(argsOverride || process.argv)
}

module.exports = async argsOverride => {
  await readCommand(argsOverride)
  await buildProd()
}
