#!/bin/bash
DIST_FILE=application/_dist/h5c3.application.js

echo "COMBINING APPLICATION LAYER ${DIST_FILE}"
mkdir -p application/_dist/
> ${DIST_FILE}

cat application/image.js >> ${DIST_FILE}
cat application/sound.js >> ${DIST_FILE} 
cat application/dataresource.js >> ${DIST_FILE}
cat application/gameresources.js >> ${DIST_FILE}
cat application/device.js >> ${DIST_FILE}
cat application/input.js >> ${DIST_FILE} 
cat application/page.js >> ${DIST_FILE} 
cat application/main.js >> ${DIST_FILE} 
cat application/systems.js >> ${DIST_FILE} 
