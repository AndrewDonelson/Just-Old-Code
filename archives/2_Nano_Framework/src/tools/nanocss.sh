#!/bin/bash
MODULE="nano"
NAME="nano framework"
VERSION="1.0.0"	
TMP_FILE=build.tmp.js
ROOT_DIR=/cygdrive/c/devtools/GitHub/H5C3_Framework
BTS_FILE=$ROOT_DIR/code/bootstrap/css/bootstrap.css
FNT_FILE=$ROOT_DIR/code/font-awesome/css/font-awesome.css
NFW_DIR=$ROOT_DIR/src/layers/r2wl/css
COMBINE="$BTS_FILE $FNT_FILE $NFW_DIR/"

cat ${COMBINE} > ${TMP_FILE}
# sed search/replace ../fonts with {FONT_PATH}
echo "- Performing nano modifications to css ${TMP_FILE}"
sed -i -e "s/{NAME}/${NAME}/" -e "s/{VERSION}/${VERSION}/" -e "s/{TIMESTAMP}/${TIMESTAMP}/" ${TMP_FILE}
cp -r -f ${TMP_FILE} ${I2TM_DIR}/css/nano.css
java -jar yuicompressor-2.4.7.jar --type css ${TMP_FILE} -o nano.min.css
mv -f nano.min.css ${I2TM_DIR}/css
exit 0
