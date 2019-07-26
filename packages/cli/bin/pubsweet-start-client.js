#!/usr/bin/env node

require('../cli/start-client')().catch(require('../src/error-exit'))
