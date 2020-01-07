#!/usr/bin/env node

require('../cli/start-server')().catch(require('../src/error-exit'))
