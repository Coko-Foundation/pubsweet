#!/bin/bash

# Directory of script
DIRECTORY=$(cd `dirname $0` && pwd)

# Modified from https://gitlab.coko.foundation/XSweet/XSweet_runner_scripts/raw/master/execute_chain.sh

# For producing HTML5 outputs via XSweet XSLT from sources extracted from .docx (Office Open XML)

# is any short identifier
TEMP=$1

XSWEET=$(find ${DIRECTORY}/.. -maxdepth 1  -name "XSweet*" -print -quit)
TYPESCRIPT=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'editoria_typescript*' -print -quit)
HTMLEVATOR=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'HTMLevator*' -print -quit)

SAXONDIR=$(find ${DIRECTORY}/.. -maxdepth 1  -name 'saxon' -print -quit)

echo $XSWEET
echo $TYPESCRIPT
echo $HTMLEVATOR

# Note Saxon is included with this distribution, qv for license.
saxonHE="java -jar ${SAXONDIR}/saxon9he.jar"  # SaxonHE (XSLT 3.0 processor)

# EXTRACTION
EXTRACT="${XSWEET}/applications/docx-extract/docx-html-extract.xsl"                       # "Extraction" stylesheet
  # NOTE: RUNS TABLE EXTRACTION FROM INSIDE EXTRACT
NOTES="${XSWEET}/applications/docx-extract/handle-notes.xsl"                            # "Refinement" stylesheets
SCRUB="${XSWEET}/applications/docx-extract/scrub.xsl"
JOIN="${XSWEET}/applications/docx-extract/join-elements.xsl"
COLLAPSEPARA="${XSWEET}/applications/docx-extract/collapse-paragraphs.xsl"

LINKS="${HTMLEVATOR}/applications/hyperlink-inferencer/hyperlink-inferencer.xsl"
PROMOTELISTS="${XSWEET}/applications/list-promote/PROMOTE-lists.xsl"
  # NOTE: RUNS mark-lists, then itemize-lists

# HEADER PROMOTION
HEADERCHOOSEANDPROMOTE="${HTMLEVATOR}/applications/header-promote/header-promotion-CHOOSE.xsl"

DIGESTPARA="${HTMLEVATOR}/applications/header-promote/digest-paragraphs.xsl"
MAKEHEADERXSLT="${HTMLEVATOR}/applications/header-promote/make-header-escalator-xslt.xsl"

MATH="${XSWEET}/applications/math/xsweet_tei_omml2mml.xsl"
FINALRINSE="${XSWEET}/applications/html-polish/final-rinse.xsl"

UCPTEXT="${HTMLEVATOR}/applications/ucp-cleanup/ucp-text-macros.xsl"
UCPMAP="${HTMLEVATOR}/applications/ucp-cleanup/ucp-mappings.xsl"

# TYPESCRIPT
SPLITONBR="${TYPESCRIPT}/p-split-around-br.xsl"
EDITORIABASIC="${TYPESCRIPT}/editoria-basic.xsl"
EDITORIAREDUCE="${TYPESCRIPT}/editoria-reduce.xsl"

XMLTOHTML5="${XSWEET}/applications/html-polish/html5-serialize.xsl"

# INDUCESECTIONS="applications/htmlevator/applications/induce-sections/induce-sections.xsl"

# Intermediate and final outputs (serializations) are all left on the file system.

$saxonHE -xsl:$EXTRACT -s:$TEMP/word/document.xml -o:$TEMP/outputs/1EXTRACTED.xhtml
echo Made 1EXTRACTED.xhtml

$saxonHE -xsl:$NOTES -s:$TEMP/outputs/1EXTRACTED.xhtml -o:$TEMP/outputs/2NOTES.xhtml
echo Made 2NOTES.xhtml

$saxonHE -xsl:$SCRUB -s:$TEMP/outputs/2NOTES.xhtml -o:$TEMP/outputs/3SCRUBBED.xhtml
echo Made 3SCRUBBED.xhtml

$saxonHE -xsl:$JOIN -s:$TEMP/outputs/3SCRUBBED.xhtml -o:$TEMP/outputs/4JOINED.xhtml
echo Made 4JOINED.xhtml

$saxonHE -xsl:$COLLAPSEPARA -s:$TEMP/outputs/4JOINED.xhtml -o:$TEMP/outputs/5COLLAPSED.xhtml
echo Made 5COLLAPSED.xhtml

$saxonHE -xsl:$LINKS -s:$TEMP/outputs/5COLLAPSED.xhtml -o:$TEMP/outputs/6LINKS.xhtml
echo Made 6LINKS.xhtml

$saxonHE -xsl:$PROMOTELISTS -s:$TEMP/outputs/6LINKS.xhtml -o:$TEMP/outputs/7PROMOTELISTS.xhtml
echo Made 7PROMOTELISTS.xhtml

$saxonHE -xsl:$HEADERCHOOSEANDPROMOTE -s:$TEMP/outputs/7PROMOTELISTS.xhtml -o:$TEMP/outputs/8HEADERSPROMOTED.xhtml
echo Made 8HEADERSPROMOTED.xhtml

# CLASSIC HP
# $saxonHE -xsl:$DIGESTPARA -s:$TEMP/outputs/7PROMOTELISTS.xhtml -o:$TEMP/outputs/8DIGESTEDPARA.xhtml
# echo Made 8DIGESTEDPARA.xhtml
#
# $saxonHE -xsl:$MAKEHEADERXSLT -s:$TEMP/outputs/8DIGESTEDPARA.xhtml -o:$TEMP/outputs/9BESPOKEHEADERXSLT.xsl
# echo Made 9BESPOKEHEADERXSLT.xsl

# HEADERXSL="$TEMP/outputs/9BESPOKEHEADERXSLT.xsl"
#
# $saxonHE -xsl:$HEADERXSL -s:$TEMP/outputs/7PROMOTELISTS.xhtml -o:$TEMP/outputs/10CLASSICHEADERSPROMOTED.xhtml
# echo Made 10CLASSICHEADERSPROMOTED.xhtml

$saxonHE -xsl:$MATH -s:$TEMP/outputs/8HEADERSPROMOTED.xhtml -o:$TEMP/outputs/9MATH.xhtml
echo Made 9MATH.xhtml

$saxonHE -xsl:$FINALRINSE -s:$TEMP/outputs/9MATH.xhtml -o:$TEMP/outputs/10RINSED.xhtml
echo Made 10RINSED.xhtml

$saxonHE -xsl:$UCPTEXT -s:$TEMP/outputs/10RINSED.xhtml -o:$TEMP/outputs/11UCPTEXTED.xhtml
echo Made 11UCPTEXTED.xhtml

$saxonHE -xsl:$UCPMAP -s:$TEMP/outputs/11UCPTEXTED.xhtml -o:$TEMP/outputs/12UCPMAPPED.xhtml
echo Made 12UCPMAPPED.xhtml


$saxonHE -xsl:$SPLITONBR -s:$TEMP/outputs/12UCPMAPPED.xhtml -o:$TEMP/outputs/13SPLITONBR.xhtml
echo Made 13SPLITONBR.xhtml

# $saxonHE -xsl:$EDITORIANOTES -s:$TEMP/outputs/13SPLITONBR.xhtml -o:$TEMP/outputs/13EDITORIANOTES.xhtml
# echo Made 13EDITORIANOTES.xhtml

$saxonHE -xsl:$EDITORIABASIC -s:$TEMP/outputs/13SPLITONBR.xhtml -o:$TEMP/outputs/14EDITORIABASIC.xhtml
echo Made 14EDITORIABASIC.xhtml

$saxonHE -xsl:$EDITORIAREDUCE -s:$TEMP/outputs/14EDITORIABASIC.xhtml -o:$TEMP/outputs/15EDITORIAREDUCE.html
echo Made 15EDITORIAREDUCE.html

$saxonHE -xsl:$XMLTOHTML5 -s:$TEMP/outputs/15EDITORIAREDUCE.html -o:$TEMP/outputs/16HTML5.html
echo Made 16HTML5.html