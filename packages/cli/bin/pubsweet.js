#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('new', 'create and set up a new pubsweet app')
  .command('setupdb', 'generate a database for a pubsweet app')
  .command('build', 'build static assets for a pubsweet app')
  .command('start', 'build static assets and start a pubsweet app')
  .command('add', 'add one or more components to a pubsweet app')
  .command('remove', 'remove one or more components from a pubsweet app')
  .command('adduser', 'add a user to the database for a pubsweet app')

// only runs if there are cmnds/opts entered
if (process.argv.length > 2) {
  const cmdArr = []
  const keyArr = Object.keys(program.commands)
  for (let i = 0; i < keyArr.length; i += i) {
    cmdArr[i] = program.commands[keyArr[i]]._name
  }

  // show help if arg isn't a valid cmd or an option flag
  const argListStart = process.argv[2]
  if (!cmdArr.includes(argListStart) && argListStart[0] !== '-') {
    program.help()
  }
}

program.parse(process.argv)
