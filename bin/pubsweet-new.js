#!/usr/bin/env node

require('../cli/new')()().catch(require('../src/error-exit'))
