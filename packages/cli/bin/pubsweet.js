#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('new', 'create and set up a new pubsweet app')
  .command('setupdb', 'generate a database for a pubsweet app')
  .command('migrate', 'run pending database migrations')
  .command('build', 'build static assets for a pubsweet app')
  .command('start', 'start pubsweet server and backing services')
  .command('server', 'build static assets and start a pubsweet app')
  .command('add', 'add one or more components to a pubsweet app')
  .command('remove', 'remove one or more components from a pubsweet app')
  .command('adduser', 'add a user to the database for a pubsweet app')
  .parse(process.argv)

if (!program.commands.map(cmd => cmd._name).includes(program.args[0])) {
  program.help()
}
