#!/bin/bash

# Directory of script
DIRECTORY=$(cd `dirname $0` && pwd)

# Modified from https://gitlab.coko.foundation/XSweet/XSweet_runner_scripts/raw/master/execute_chain.sh

# For producing HTML5 outputs via XSweet XSLT from sources extracted from .docx (Office Open XML)

# is any short identifier
TEMP=$1

XSWEET=$(find ${DIRECTORY}/.. -maxdepth 1  -name "XSweet*" -print -quit)
# TYPESCRIPT=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'editoria_typescript*' -print -quit)
# HTMLEVATOR=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'HTMLevator*' -print -quit)

SAXONDIR=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'saxon' -print -quit)

echo $XSWEET
# echo $TYPESCRIPT
# echo $HTMLEVATOR

# Note Saxon is included with this distribution, qv for license.
saxonHE="java -jar ${SAXONDIR}/saxon9he.jar"  # SaxonHE (XSLT 3.0 processor)

# EXTRACTION
PIPELINE="${XSWEET}/applications/PIPELINE.xsl"                       # "Extraction" stylesheet

XMLTOHTML5="${XSWEET}/applications/html-polish/html5-serialize.xsl"


$saxonHE -xsl:$PIPELINE -s:$TEMP/word/document.xml -o:$TEMP/outputs/PIPELINED.xhtml
echo Made PIPELINED.xhtml

$saxonHE -xsl:$XMLTOHTML5 -s:$TEMP/outputs/PIPELINED.xhtml -o:$TEMP/outputs/HTML5.html
echo Made HTML5.html