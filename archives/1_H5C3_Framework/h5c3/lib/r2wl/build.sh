#!/bin/bash
DIST_FILE=r2wl/_dist/h5c3.r2wl.js

echo "COMBINING RICH RESPONSIVE WEB LAYER (R2WL) ${DIST_FILE}"
mkdir -p r2wl/_dist/
#rm -f ${DIST_FILE}
> ${DIST_FILE}

cat r2wl/r2wl_common.js >> ${DIST_FILE}
cat r2wl/brand.js >> ${DIST_FILE}
cat r2wl/google.js >> ${DIST_FILE}
cat r2wl/style.js >> ${DIST_FILE}
cat r2wl/layout.js >> ${DIST_FILE}
cat r2wl/smartmenu.js >> ${DIST_FILE}
cat r2wl/applet.js >> ${DIST_FILE}
cat r2wl/cloudapp.js >> ${DIST_FILE}
