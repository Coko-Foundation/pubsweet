#!/usr/bin/env node

require('../cli/run')().catch(require('../src/error-exit'))
