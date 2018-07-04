#!/bin/bash
echo "*******************************************************************"
echo " This Script processes all source files and documentation into	*"
echo " the developer folders. You must use publish to move the files	*"
echo " into the LIVE public DevPortal folder (repo)						*"
echo "*******************************************************************"

VERSION="0.9.9-alpha"
TIMESTAMP=$(date +"%c")

HOST=www.i2tmlabs.com  		#This is the FTP servers host or IP address. 
USER=nlaakald             	#This is the FTP user that has access to the server. 
PASS=yy166027!ALD      		#This is the password for the FTP user. 

#H5C3 DEVELOPERS PORTAL (public)
H5C3_DIR=/d/Android_Dev/GitHUB/H5C3_Dev

SBOX_DIR=/d/Android_Dev/GitHUB/com.I2TMLabs.h5c3.development/public/sandbox

#h5c3 DEVELOPERS PORTAL
MAIN_IN=$ROOT_DIR/h5c3.js

OUT_CAT_DEBUG=$DIST_DIR/h5c3.debug.cat.js
OUT_MIN_DEBUG=$DIST_DIR/h5c3.debug.min.js
OUT_DEBUG=$DIST_DIR/h5c3.debug.gz

OUT_CAT_RELEASE=$DIST_DIR/h5c3.prod.cat.js
OUT_MIN_RELEASE=$DIST_DIR/h5c3.prod.min.js
OUT_RELEASE=$DIST_DIR/h5c3.prod.gz

WEB_DIR=/d/Android_Dev/GitHUB/WEB/h5c3
OUT_JS=$H5C3_DIR/dist
OUT_PLG=$H5C3_DIR/plugins



##############################################
# Common Build Paths - Include file
##############################################
ROOT_DIR=/d/Android_Dev/GitHUB/H5C3-Dev

### H5C3 Config Folder
CFG_DIR=$ROOT_DIR/config

### Input Folder(s)
LIB_DIR=$ROOT_DIR/lib

THIRD_DIR=$PUBLIC_DIR/thirdparty

#H5C3 DEVZONE (development)
DEVZONE_DIR=$PUBLIC_DIR/devzone
#H5C3 DEVZONE (test)
DEVZONE_TEST_DIR=$ROOT_DIR/_TEST/devzone
#H5C3 DEVZONE (live)
DEVZONE_LIVE_DIR=$ROOT_DIR/_LIVE/devzone

H5C3_SHR=$ROOT_DIR/public/shared

### Output Folders
DISTROS_DIR=$ROOT_DIR/_DISTROS
mkdir -p $DISTROS_DIR

### Local Test.Use Version for Development, Root folder of Distros
OUT_CAT_DEBUG=$DISTROS_DIR/h5c3.debug.cat.js
OUT_MIN_DEBUG=$DISTROS_DIR/h5c3.debug.min.js
OUT_DEBUG=$DISTROS_DIR/h5c3.debug.gz

CI2L_CAT_DEBUG=$DISTROS_DIR/ci2l.debug.cat.js
CI2L_MIN_DEBUG=$DISTROS_DIR/ci2l.debug.min.js
CI2L_DEBUG=$DISTROS_DIR/ci2l.debug.gz

R2WL_CAT_DEBUG=$DISTROS_DIR/r2wl.debug.cat.js
R2WL_MIN_DEBUG=$DISTROS_DIR/r2wl.debug.min.js
R2WL_DEBUG=$DISTROS_DIR/r2wl.debug.gz

OCAL_CAT_DEBUG=$DISTROS_DIR/ocal.debug.cat.js
OCAL_MIN_DEBUG=$DISTROS_DIR/ocal.debug.min.js
OCAL_DEBUG=$DISTROS_DIR/ocal.debug.gz

OUT_CAT_RELEASE=$DISTROS_DIR/h5c3.prod.cat.js
OUT_MIN_RELEASE=$DISTROS_DIR/h5c3.prod.min.js
OUT_RELEASE=$DISTROS_DIR/h5c3.prod.gz

BUILD_FILE=build.js

if [ "$1" == debug ]; then
	echo "[Preparing Developer Edition v"$VERSION" built $TIMESTAMP]"
	DISTRO="Developer"
	OUT_CAT=$OUT_CAT_DEBUG
	OUT_MIN=$OUT_MIN_DEBUG
	OUT_ZIP=$OUT_DEBUG
	#> ${OUT_CAT}
	#Development support
	#cat $MAIN_IN >> ${OUT_CAT}
elif [ "$1" == prod ]; then
	echo "[Preparing Production Edition v"$VERSION"]"
	DISTRO="Production"
	OUT_CAT=$OUT_CAT_RELEASE
	OUT_MIN=$OUT_MIN_RELEASE
	OUT_ZIP=$OUT_RELEASE
	#cat $MAIN_IN >> ${OUT_CAT}
else
	buildapi.sh debug
	buildapi.sh prod
	exit 2
fi

PKG_NAME="$1"-v"$VERSION"
OUT_DST=${DISTROS_DIR}/${DISTRO}
mkdir -p ${OUT_DST}
OUT_DST_PKG=${OUT_DST}/${PKG_NAME}
mkdir -p ${OUT_DST_PKG}

core/build.sh
r2wl/build.sh
application/build.sh

##############################################
# COMBINING H5C3 CLOUD API (PRIVATE)
##############################################
echo "COMBINING CLOUD API ${BUILD_FILE}"
#rm -f ${OUT_CAT}
> $BUILD_FILE
cat ./header.js core/_dist/h5c3.core.js r2wl/_dist/h5c3.r2wl.js application/_dist/h5c3.application.js ./footer.js > ${BUILD_FILE}

echo "Inserting distribution, version and build time into ${BUILD_FILE}"
sed -i.bak -e "s/{VERSION}/${VERSION}/" -e "s/{DISTRO}/${DISTRO}/" -e "s/{TIMESTAMP}/${TIMESTAMP}/" ${BUILD_FILE}

##############################################
# REMOVE ALL LINES OF CODE WITH "debug" 
##############################################
if [ "$1" == prod ]; then
	echo "REMOVE ALL LINES OF CODE FOR DEBUGGING FROM ${BUILD_FILE}"
	echo "- Setting Attributes for ${BUILD_FILE}"
	echo "- Removing any debug calls from ${BUILD_FILE}"
	#sed -n -i -e '/FooBar/d' ${BUILD_FILE}
	sed '/_DBG_/d' $BUILD_FILE > build.no-debug.js; mv build.no-debug.js $BUILD_FILE;
fi

##############################################
# MINIMIZE -> COMPRESS
##############################################
echo "Minimizing [${BUILD_FILE} to ${BUILD_FILE}]..."
rm -f ${OUT_MIN}

if [ "$2" == google ]; then
compile.sh google ${BUILD_FILE} ${OUT_MIN}
#closure.sh ${BUILD_FILE} ${BUILD_FILE}.min
elif [ "$2" == uglify ]; then
uglifyjs $BUILD_FILE -o ${OUT_MIN} -c -m -v --comments --define unused=false, DEBUG=true
fi


echo "Compressing...[${OUT_MIN} to ${OUT_ZIP}]"
rm -f ${OUT_ZIP}
gzip -c -f ${OUT_MIN} > ${OUT_ZIP}
echo "["$PKG_NAME" Finalized]"

echo "Moving files to thier locations..."
cp -f -p ${OUT_MIN} ${H5C3_SHR}/js/int/
cp -f -p ${OUT_ZIP} ${H5C3_SHR}/js/int/
cp -f -p ${OUT_MIN} ${OUT_DST_PKG}
cp -f -p ${OUT_ZIP} ${OUT_DST_PKG}
cp -f -p $BUILD_FILE $OUT_CAT

cd ${DISTROS_DIR}
pwd

echo "Transfering to server."
ftp -inv $HOST << EOF 
user $USER $PASS 
cd www/h5c3/public/shared/js/int 
put h5c3.$1.min.js 
bye 
EOF 
echo Done.
cd ${LIB_DIR}
echo Complete.
exit
