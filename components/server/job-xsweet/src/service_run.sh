#!/bin/bash
set -x

npx wait-for-it $WAIT_SERVICE_PORT --strict --timeout=$WAIT_TIMEOUT -- node ./src/xsweet.js
