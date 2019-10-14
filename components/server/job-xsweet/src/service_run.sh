#!/bin/bash
set -x
exec ./src/wait-for-it.sh $WAIT_SERVICE_PORT --strict --timeout=$WAIT_TIMEOUT -- node ./src/xsweet.js
