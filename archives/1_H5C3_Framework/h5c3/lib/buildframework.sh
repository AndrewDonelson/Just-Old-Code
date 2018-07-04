#!/bin/bash
echo "*******************************************************************"
echo " This Script processes all source files and documentation into	*"
echo " the developer folders. You must use publish to move the files	*"
echo " into the LIVE public DevPortal folder (repo)						*"
echo "*******************************************************************"

VERSION="0.9.7-RC1"
ROOT_DIR=..
DEV_DIR=../lib
DIST_DIR=../dist


#H5C3 DEVELOPERS PORTAL (public)
H5C3_DIR=/d/Android_Dev/GitHUB/com.I2TMLabs.h5c3

H5C3_SHR=/d/Android_Dev/GitHUB/com.I2TMLabs.h5c3/shared

#h5c3 DEVELOPERS PORTAL
MAIN_IN=$ROOT_DIR/h5c3.js

OUT_CAT_DEBUG=$DIST_DIR/h5c3.debug.cat.js
OUT_MIN_DEBUG=$DIST_DIR/h5c3.debug.min.js
OUT_DEBUG=$DIST_DIR/h5c3.debug.gz

OUT_CAT_RELEASE=$DIST_DIR/h5c3.release.cat.js
OUT_MIN_RELEASE=$DIST_DIR/h5c3.release.min.js
OUT_RELEASE=$DIST_DIR/h5c3.release.gz

WEB_DIR=/d/Android_Dev/GitHUB/WEB/h5c3
OUT_JS=$H5C3_DIR/dist
OUT_PLG=$H5C3_DIR/plugins


mkdir -p ${DIST_DIR}

if [ "$1" == debug ]; then
	echo "[Preparing Developer Edition v"$VERSION"]"
	DISTRO="Developer"
	OUT_CAT=$OUT_CAT_DEBUG
	OUT_MIN=$OUT_MIN_DEBUG
	OUT_ZIP=$OUT_DEBUG
	echo "-> Delete old file if exists."
	rm -f ${OUT_CAT}
	#Development support
	cat $MAIN_IN >> ${OUT_CAT}
elif [ "$1" == release ]; then
	echo "[Preparing Production Edition v"$VERSION"]"
	DISTRO="Production"
	OUT_CAT=$OUT_CAT_RELEASE
	OUT_MIN=$OUT_MIN_RELEASE
	OUT_ZIP=$OUT_RELEASE
	echo "-> Delete old file if exists."
	rm -f ${OUT_CAT}
	cat $MAIN_IN >> ${OUT_CAT}
else
	build.sh debug
	build.sh release
	exit 2
fi

PKG_NAME="$1"-v"$VERSION"
OUT_DST=${OUT_JS}/${DISTRO}
OUT_DST_PKG=${OUT_DST}/${PKG_NAME}

##############################################
# PREPARE CORE LAYER (PRIVATE)
##############################################
lib/core/build.sh

##############################################
# PREPARE ENGINE LAYER (PRIVATE)
##############################################
lib/engine/build.sh

##############################################
# PREPARE R2WL LAYER (PRIVATE)
##############################################
lib/r2wl/build.sh

##############################################
# PREPARE APPLICATION LAYER (PRIVATE)
##############################################
lib/application/build.sh

##############################################
# COMBINING H5C3 CLOUD API (PRIVATE)
##############################################
echo "-> COMBINING CLOUD API ${OUT_CAT}"
cat header.js >> ${OUT_CAT}
cat lib/core/build.sh  >> ${OUT_CAT}
cat lib/engine/build.sh >> ${OUT_CAT}
cat lib/r2wl/build.sh >> ${OUT_CAT}
cat lib/application/build.sh >> ${OUT_CAT}
cat footer.js >> ${OUT_CAT}

echo "-> Inserting distribution & version into ${OUT_CAT}"
sed -i -e "s/{VERSION}/${VERSION}/" -e "s/{DISTRO}/${DISTRO}/" ${OUT_CAT}

##############################################
# REMOVE ALL LINES OF CODE WITH "debug" 
##############################################
if [ "$1" == release ]; then
	echo "-> REMOVE ALL LINES OF CODE FOR DEBUGGING FROM ${OUT_CAT}"
	echo "----> Setting Attributes for ${OUT_CAT}"
	echo "----> Removing any debug calls from ${OUT_CAT}"
	echo "----> BEGIN"
	sed -i '/this.debug/d' ${OUT_CAT}
	echo "---->END"
	echo "-> Done."
fi

##############################################
# MINIMIZE -> COMPRESS
##############################################
echo "-> MINIMIZE and COMPRESS"
echo "----> Minimizing [${OUT_CAT} to ${OUT_MIN}]..."
rm -f ${OUT_MIN}
echo "----> BEGIN"
java -jar compiler.jar --js ${OUT_CAT} --js_output_file ${OUT_MIN} --compilation_level SIMPLE_OPTIMIZATIONS --version
echo "----> END"
echo "----> Compressing...[${OUT_MIN} to ${OUT_ZIP}]"
gzip -c -f ${OUT_MIN} > ${OUT_ZIP}
echo "["$PKG_NAME" Finalized]"

##############################################
# PREPARE FRAMEWORK LAYER (PUBLIC)
##############################################
lib/framework/build.sh


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