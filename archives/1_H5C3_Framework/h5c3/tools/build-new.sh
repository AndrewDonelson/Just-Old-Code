#!/bin/bash
echo "*******************************************************************"
echo " This Script processes all source files and documentation into	*"
echo " the developer folders. You must use publish to move the files	*"
echo " into the LIVE public DevPortal folder (repo)						*"
echo "*******************************************************************"

VERSION="0.9.7-RC1"
ROOT_DIR=..
DEV_DIR=../lib
PLG_DIR=../plugins
DIST_DIR=../dist
XTR_DIR=../extras

NDROOT=d:/Android_Dev/GitHUB/NaturalDocs

#h5c3 DEVELOPERS PORTAL
H5C3_DIR=/d/Android_Dev/GitHUB/com.I2TMLabs.h5c3
MAIN_IN=$ROOT_DIR/h5c3.js

OUT_CAT_DEBUG=$DIST_DIR/h5c3.debug.cat.js
OUT_MIN_DEBUG=$DIST_DIR/h5c3.debug.min.js
OUT_DEBUG=$DIST_DIR/h5c3.debug.gz

OUT_CAT_RELEASE=$DIST_DIR/h5c3.release.cat.js
OUT_MIN_RELEASE=$DIST_DIR/h5c3.release.min.js
OUT_RELEASE=$DIST_DIR/h5c3.release.gz

WEB_DIR=/d/Android_Dev/GitHUB/WEB/h5c3
OUT_JS=$H5C3_DIR/dist
OUT_DOC=$H5C3_DIR/docs
OUT_PLG=$H5C3_DIR/plugins


mkdir -p ${DIST_DIR}

if [ "$1" == debug ]; then
	echo "[Preparing Developer Edition v"$VERSION"]"
	DISTRO="Developer"
	OUT_CAT=$OUT_CAT_DEBUG
	OUT_MIN=$OUT_MIN_DEBUG
	OUT_ZIP=$OUT_DEBUG
	attrib -r +a ${OUT_CAT}
	echo "-> Delete old file if exists."
	> ${OUT_CAT}
	#Development support
	cat $MAIN_IN >> ${OUT_CAT}
elif [ "$1" == release ]; then
	echo "[Preparing Production Edition v"$VERSION"]"
	DISTRO="Production"
	OUT_CAT=$OUT_CAT_RELEASE
	OUT_MIN=$OUT_MIN_RELEASE
	OUT_ZIP=$OUT_RELEASE
	attrib -r +a ${OUT_CAT}
	echo "-> Delete old file if exists."
	> ${OUT_CAT}
	cat $MAIN_IN >> ${OUT_CAT}
else
	build.sh debug
	build.sh release
	exit 2
fi

PKG_NAME="$1"-v"$VERSION"
OUT_DST=${OUT_JS}/${DISTRO}
OUT_DST_PKG=${OUT_DST}/${PKG_NAME}

attrib -r +a ${OUT_CAT}
echo "-> Inserting distribution & version into ${OUT_CAT}"
sed -i -e "s/{VERSION}/${VERSION}/" -e "s/{DISTRO}/${DISTRO}/" ${OUT_CAT}

#Build Externals
echo "-> Building externals into ${OUT_CAT}"
attrib -r +a ${OUT_CAT}
cat $DEV_DIR/ext/base64.js >> ${OUT_CAT}

##############################################
# PREPARE CORE
##############################################
../lib/core/build.sh

##############################################
# COMBINING ENGINE
##############################################
echo "-> COMBINING ENGINE ${OUT_CAT}"
attrib -r +a ${OUT_CAT}
cat $DEV_DIR/engine/config.js >> ${OUT_CAT} 
cat $DEV_DIR/engine/HTMLVariable.js >> ${OUT_CAT} 
cat $DEV_DIR/engine/media.js >> ${OUT_CAT} 
cat $DEV_DIR/engine/input.js >> ${OUT_CAT}
cat $DEV_DIR/engine/tools.js >> ${OUT_CAT}
cat $DEV_DIR/engine/loader.js >> ${OUT_CAT}
cat $DEV_DIR/engine/dataresource.js >> ${OUT_CAT}
cat $DEV_DIR/engine/math.js >> ${OUT_CAT}
cat $DEV_DIR/engine/accutimer.js >> ${OUT_CAT}
cat $DEV_DIR/engine/hashmap.js >> ${OUT_CAT}
cat $DEV_DIR/engine/systems.js >> ${OUT_CAT}
cat $DEV_DIR/engine/plugin.js >> ${OUT_CAT} 
cat $DEV_DIR/engine/device.js >> ${OUT_CAT}

##############################################
# COMBINING FRAMEWORK
##############################################
echo "-> COMBINING FRAMEWORK ${OUT_CAT}"
cat $DEV_DIR/framework/banners.js >> ${OUT_CAT}
cat $DEV_DIR/framework/main.js >> ${OUT_CAT}
cat $DEV_DIR/framework/game.js >> ${OUT_CAT}
cat $DEV_DIR/framework/page.js >> ${OUT_CAT} 
cat $DEV_DIR/framework/color.js >> ${OUT_CAT}
cat $DEV_DIR/framework/factory.js >> ${OUT_CAT}
cat $DEV_DIR/framework/entity.js >> ${OUT_CAT}
cat $DEV_DIR/framework/layer.js >> ${OUT_CAT}
cat $DEV_DIR/framework/entitylayer.js >> ${OUT_CAT}
cat $DEV_DIR/framework/sound.js >> ${OUT_CAT}
cat $DEV_DIR/framework/sprite.js >> ${OUT_CAT}
cat $DEV_DIR/framework/spritesheet.js >> ${OUT_CAT}
cat $DEV_DIR/framework/string.js >> ${OUT_CAT}
cat $DEV_DIR/framework/image.js >> ${OUT_CAT}
cat $DEV_DIR/framework/scene.js >> ${OUT_CAT}
cat $DEV_DIR/framework/intro.js >> ${OUT_CAT}
cat $DEV_DIR/framework/google.js >> ${OUT_CAT}

##############################################
# PROCESS DOCUMENTATION & PUBLISH
##############################################
if [ "$1" == debug ]; then
	echo "-> PROCESS DOCUMENTATION & PUBLISH ${OUT_CAT}"
	rm -rf ${NDROOT}/docs/src
	mkdir -p ${NDROOT}/docs/src
	
	echo "----> Copying ${DEV_DIR} to Natural Docs Working Folder..."
	cp -u -r ../h5c3.js ${NDROOT}/docs/src/
	echo "----> Copying ${DEV_DIR} to Natural Docs Working Folder..."
	cp -u -r ${DEV_DIR} ${NDROOT}/docs/src/
	echo "----> Copying ${PLG_DIR} to Natural Docs Working Folder..."
	cp -u -r  ${PLG_DIR} ${NDROOT}/docs/src/
	echo "----> Copying ${XTR_DIR} to Natural Docs Working Folder..."
	cp -u -r  ${XTR_DIR} ${NDROOT}/docs/src/
	
	echo "----> Changed working folder to ${NDROOT}/"
	cd ${NDROOT}/
	echo "----> Building Documentation..."
	echo "----> BEGIN"
	NaturalDocs -i docs/src/ -o HTML docs/out/ -p docs/prj/ -r
	echo "----> END"
	echo "----> Documentation Generated."
	
	echo "----> Deleting old and Moving new documentation to ${OUT_DOC}/"
	mkdir -p ${OUT_DOC}
	cp --u -r docs/out/ ${H5C3_DIR}
	cd ${H5C3_DIR}
	rm -r docs
	mv out docs
	cd ${H5C3_DIR}.development/h5c3/tools/
	echo "-> Done."
fi


##############################################
# REMOVE ALL LINES OF CODE WITH "debug" 
##############################################
if [ "$1" == release ]; then
	echo "-> REMOVE ALL LINES OF CODE FOR DEBUGGING FROM ${OUT_CAT}"
	echo "----> Setting Attributes for ${OUT_CAT}"
	attrib -r ${OUT_CAT}
	echo "----> Removing any debug calls from ${OUT_CAT}"
	echo "----> BEGIN"
	sed -i '/$_DBG_/d' ${OUT_CAT}
	echo "---->END"
	echo "-> Done."
fi

##############################################
# MINIMIZE -> COMPRESS
##############################################
echo "-> MINIMIZE and COMPRESS"
echo "----> Minimizing [${OUT_CAT} to ${OUT_MIN}]..."
> ${OUT_MIN}
echo "----> BEGIN"
java -jar compiler.jar --js ${OUT_CAT} --js_output_file ${OUT_MIN} --compilation_level SIMPLE_OPTIMIZATIONS --version
echo "----> END"
echo "----> Compressing...[${OUT_MIN} to ${OUT_ZIP}]"
gzip -c -f ${OUT_MIN} > ${OUT_ZIP}
echo "["$PKG_NAME" Finalized]"

##############################################
# DISPERSE TO DEVELOPERS PORTAL
##############################################
echo "-> DISPERSE TO DEVELOPERS PORTAL"
echo "----> Creating new package folder ["$OUT_PKG_DST"]"
mkdir -p ${OUT_JS}
mkdir -p ${OUT_DST}
rm -rf ${OUT_DST_PKG}
mkdir -p ${OUT_DST_PKG}
echo "----> Copying Packages to ["$OUT_DST_PKG"]"
cp -u ${OUT_CAT} ${OUT_DST_PKG}
cp -u ${OUT_MIN} ${OUT_DST_PKG}
cp -u ${OUT_ZIP} ${OUT_DST_PKG}
echo "----> Copying Plugins to Developer folder..."
mkdir -p ${OUT_PLG}
cp --u -r ../plugins ${H5C3_DIR}
echo "-> Done."

echo "IMPORTANT: DO NOT forget to change stylesheet to i2tm standard documentation.css..."

exit