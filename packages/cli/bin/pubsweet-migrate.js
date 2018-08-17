#!/usr/bin/env node

require('../cli/migrate')().catch(require('../src/error-exit'))
