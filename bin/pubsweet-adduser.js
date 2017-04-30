#!/usr/bin/env node

require('../cli/adduser')().catch(require('../src/error-exit'))
