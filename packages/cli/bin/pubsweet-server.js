#!/usr/bin/env node

require('../cli/server')().catch(require('../src/error-exit'))
