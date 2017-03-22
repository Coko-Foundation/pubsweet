#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const mockdatafile = path.join(__dirname, '..', 'helpers', 'mockapp.json')

const mockdata = require(mockdatafile)

const logfile = path.join(mockdata.server, 'logs', 'production', 'stderr.log')

console.log(logfile)

try {
  fs.statSync(logfile)
  console.log('APP ERROR LOG:')
  console.log(fs.readFileSync(logfile))
} catch (e) {
  console.log('No app error log to show')
}

fs.unlinkSync(mockdatafile)

process.kill(-mockdata.pid)
