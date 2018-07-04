#!/bin/bash
DIST_FILE=core/_dist/h5c3.core.js

echo "COMBINING CORE ${DIST_FILE}"
mkdir -p core/_dist/
#rm -f ${DIST_FILE}
> ${DIST_FILE}

cat core/string.js >> ${DIST_FILE} 
cat core/stacktrace.js >> ${DIST_FILE}
cat core/json2.js >> ${DIST_FILE} 
cat core/base64.js >> ${DIST_FILE}
cat core/alias.js >> ${DIST_FILE} 
cat core/h5c3.js >> ${DIST_FILE}
cat core/errorhandler.js >> ${DIST_FILE}
cat core/lzw.js >> ${DIST_FILE}
cat core/tools.js >> ${DIST_FILE}
cat core/media.js >> ${DIST_FILE} 
cat core/hashmap.js >> ${DIST_FILE}
cat core/localstorage.js >> ${DIST_FILE}
cat core/accutimer.js >> ${DIST_FILE}
cat core/factory.js >> ${DIST_FILE}
cat core/plugin.js >> ${DIST_FILE} 
cat core/loader.js >> ${DIST_FILE}
cat core/throttle.js >> ${DIST_FILE}
cat core/bootstrap.js >> ${DIST_FILE}
