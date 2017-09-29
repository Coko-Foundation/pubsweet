#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('new', 'create and set up a new pubsweet app')
  .command('start', 'start a pubsweet app')
  .command('setupdb', 'generate a database for a pubsweet app')
  .command('add', 'add one or more components to a pubsweet app')
  .command('remove', 'remove one or more components to a pubsweet app')
  .command('adduser', 'add a user to the database for a pubsweet app')

program.parse(process.argv)
