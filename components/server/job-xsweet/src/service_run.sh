#!/bin/bash
set -x
wait-for-it $WAIT_SERVICE_PORT --strict --timeout=$WAIT_TIMEOUT -- node ./src/xsweet.js
