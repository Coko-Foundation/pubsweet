#!/usr/bin/env node --preserve-symlinks

const program = require('commander')

const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('new [name]', 'create and set up a new pubsweet app')
  .command('run [path]', 'start pubsweet app at [path] (default: current directory)')
  .command('add <components>', 'add one or more components to the app in the current working directory')

program.parse(process.argv)
