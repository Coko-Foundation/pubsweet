#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('new [name]', 'create and set up a new pubsweet app')
  .command('start [path]', 'start pubsweet app at [path] (default: current directory)')
  .command('stop [path]', 'stop pubsweet app at [path] (default: current directory)')

program.on('--help', require('../src/header'))

program.parse(process.argv)
