#!/bin/bash
DIST_FILE=framework/dist/h5c3.framework.js

echo "-> COMBINING FRAMEWORK LAYER (PUBLIC) ${DIST_FILE}"
echo "-> Delete old file if exists."
rm -f ${DIST_FILE}

cat framework/banners.js >> ${DIST_FILE}
cat framework/color.js >> ${DIST_FILE} 
cat framework/entity.js >> ${DIST_FILE}
cat framework/entitylayer.js >> ${DIST_FILE}
cat framework/game.js >> ${DIST_FILE}
cat framework/intro.js >> ${DIST_FILE} 
cat framework/layer.js >> ${DIST_FILE} 
cat framework/math.js >> ${DIST_FILE} 
cat framework/scene.js >> ${DIST_FILE} 
cat framework/sprite.js >> ${DIST_FILE} 
cat framework/spritesheet.js >> ${DIST_FILE} 
cat framework/touchpad.js >> ${DIST_FILE} 
echo "-> Done."