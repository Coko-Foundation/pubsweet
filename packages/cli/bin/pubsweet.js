#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command(
    'adduser',
    'add a user to the database for a PubSweet app (deprecated)',
  )
  .command('build', 'build static assets for a PubSweet app')
  .command('migrate', 'run pending database migrations')
  .command('new', 'create and set up a new PubSweet app')
  .command(
    'server',
    'build static assets and start a PubSweet app (deprecated)',
  )
  .command('setupdb', 'generate a database for a PubSweet app (deprecated)')
  .command('start', 'start PubSweet server and backing services')
  .command('start-server', "start the app's server")
  .alias('start:server')
  .command('start-client', 'compile and serve the client application')
  .alias('start:client')
  .parse(process.argv)

if (!program.commands.map(cmd => cmd._name).includes(program.args[0])) {
  program.help()
}
