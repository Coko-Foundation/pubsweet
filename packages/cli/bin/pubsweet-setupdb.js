#!/usr/bin/env node

require('../cli/setupdb')().catch(require('../src/error-exit'))
