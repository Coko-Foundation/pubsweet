#!/bin/bash

# Directory of script
DIRECTORY=$(cd `dirname $0` && pwd)

TEMP=$1

XSWEET=$(find ${DIRECTORY}/.. -maxdepth 1  -name "XSweet*" -print -quit)
TYPESCRIPT=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'editoria_typescript*' -print -quit)
HTMLEVATOR=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'HTMLevator*' -print -quit)

SAXONDIR=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'saxon' -print -quit)

echo $XSWEET
echo $TYPESCRIPT
echo $HTMLEVATOR

mv $XSWEET XSweet
mv $TYPESCRIPT XSweet/applications/typescript
mv $HTMLEVATOR XSweet/applications/htmlevator
