#!/usr/bin/env node

require('../cli/build')().catch(require('../src/error-exit'))
