#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')

program
  .version(pkg.version)
  .command('new [name]', 'create and set up a new pubsweet app')
  .parse(process.argv)
