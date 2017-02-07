#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const mockdatafile = path.join(__dirname, '..', 'helpers', 'mockapp.json')

const mockdata = require(mockdatafile)

fs.unlinkSync(mockdatafile)

process.kill(-mockdata.pid)
