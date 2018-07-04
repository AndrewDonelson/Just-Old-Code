#!/bin/bash
#                         
### We are running internal operation...do not show banner again.                                                
if [ "$3" != internal ]; then
	echo "  _  _ ____ ____ ____ ___ ____ ____ ";
	echo "  |\/| |__| |___ [__   |  |__/ |  | ";
	echo "  |  | |  | |___ ___]  |  |  \ |__| ";
	echo "                                    ";	
fi
#
### OOPS! Display usage help
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"     
	echo "USAGE: $BUILD [Module] [build]"
	echo "Modules:"
	echo "	maestro || maestrocss"
	echo "Builds:"
	echo "	local || debug || release"
	echo "Note: No Build type will build all three types."
fi
echo "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
BUILD=build2.sh
TIMESTAMP=$(date +"%c")
CURRFOLDER=$(pwd)
VERSION="1.5.0"

if [ "$3" != internal ]; then
	if [[ -z "$VERSION" ]]; then
		read -p "Please enter current version?" VERSION
	else
		echo "Current Maestro Version is ${VERSION}"
	fi

	VER_BOOTSTRAP=`json -f ../../bootstrap.pkg.json version`;
	echo "Bootstrap ${VER_BOOTSTRAP}"
	VER_JQUERY=`json -f ../../jquery.pkg.json version`;
	echo "jQuery ${VER_JQUERY}"
	VER_FONTAWESOME=`json -f ../../font-awesome.pkg.json version`;
	echo "Font-Awesome ${VER_FONTAWESOME}"
	VER_MODERNIZR=`json -f ../../modernizr.pkg.json version`;
	echo "Modernizr ${VER_MODERNIZR}"
	
elif [ "$3" == internal ]; then
	VERSION=$4
	VER_BOOTSTRAP=$5
	VER_JQUERY=$6
	VER_FONTAWESOME=$7
	VER_MODERNIZR=$8
fi
#
echo Current Working Folder: $CURRFOLDER
#
### H5C3 DEVELOPERS FOLDER (local)
HOST=cdn.i2tmlabs.com	  		#This is the FTP servers host or IP address. 
USER=nlaakald             		#This is the FTP user that has access to the server. 
PASS=yy166027!ALD      			#This is the password for the FTP user. 
#
GIT_DIR=/cygdrive/c/devtools/GitHub
TEST_DIR=/cygdrive/c/devtools/ZendServer/Apache2/htdocs
ROOT_DIR=$GIT_DIR/Maestro
CDN_DIR=$GIT_DIR/cdn/framework/maestro
LCL_NFW=/cygdrive/c/devtools/ZendServer/Apache2/htdocs/cdn/framework/maestro

mkdir -p $CDN_DIR
SRC_DIR=$ROOT_DIR/maestro
DST_DIR=$ROOT_DIR/dist
TMP_FILE=build.tmp.js
#
### Output Folders
mkdir -p $DST_DIR

#
### Determine distribution type
if [ "$1" == maestro ]; then
	MODULE="maestro"
	NAME="Maestro"
	SRC_DIR=$SRC_DIR/js
	COMBINE="$SRC_DIR/maestro.javascript.js $SRC_DIR/maestro.poic.js $SRC_DIR/maestro.core.js $SRC_DIR/maestro.interface.js $SRC_DIR/maestro.alias.js $SRC_DIR/maestro.encoders.js $SRC_DIR/maestro.db.js $SRC_DIR/maestro.system.js $SRC_DIR/maestro.console.js $SRC_DIR/maestro.maestro.js $SRC_DIR/maestro.tail.js"
elif [ "$1" == css ]; then
	MODULE="maestro"
	NAME="Maestro CSS"
	SRC_DIR=$SRC_DIR/css
	COMBINE="$SRC_DIR/core_common.css $SRC_DIR/core_fonts.css $SRC_DIR/core_loading.css"
	cat ${COMBINE} > ${TMP_FILE}
	# sed search/replace ../fonts with {FONT_PATH}
	echo "- Performing nano modifications to css ${TMP_FILE}"
	sed -i -e "s/{NAME}/${NAME}/" -e "s/{VERSION}/${VERSION}/" -e "s/{TIMESTAMP}/${TIMESTAMP}/" ${TMP_FILE}
	 cp -rfu ${TMP_FILE} $DST_DIR/maestro.css
	java -jar yuicompressor-2.4.7.jar --type css ${TMP_FILE} -o maestro.min.css
	mv maestro.min.css $DST_DIR
	exit 0
elif [ "$1" == docs ]; then
	echo Building Documentation...
	jsdoc -c jsdoc.conf.json
	echo Complete.
	exit 0
else
	echo "ERROR: Invalid parameter for Source Module. Use [all|css|docs]"
	exit 2
fi
#
#DESC=`cat $ROOT_DIR/$MODULE/header.js`
#
###Determine distribution type
if [ "$2" == debug ]; then
	DISTRO="debug"
	DEVMODE="yes"
elif [ "$2" == release ]; then
	DISTRO="release"
	DEVMODE="no"
elif [ "$2" == local ]; then
	DISTRO="local"
	DEVMODE="yes"
elif [ "$2" == "" ]; then
	$BUILD $MODULE local internal $VERSION $VER_BOOTSTRAP $VER_JQUERY $VER_FONTAWESOME $VER_MODERNIZR
	$BUILD $MODULE debug internal $VERSION $VER_BOOTSTRAP $VER_JQUERY $VER_FONTAWESOME $VER_MODERNIZR
	$BUILD $MODULE release internal	$VERSION $VER_BOOTSTRAP $VER_JQUERY $VER_FONTAWESOME $VER_MODERNIZR
	exit
else
	echo "ERROR: Invalid parameter for Distribution type. Use [local|debug|release|all]"
	exit 2
fi
#
echo "$NAME $DISTRO Edition v$VERSION built $TIMESTAMP"
#
### Setup Package names & Folders
PKG_FOLDER=$MODULE.$DISTRO-v$VERSION
OUT_DST=${DST_DIR}/${DISTRO}
mkdir -p ${OUT_DST}
OUT_DST_PKG=${OUT_DST}/${PKG_FOLDER}
mkdir -p ${OUT_DST_PKG}
OUT_FILE=$MODULE.$DISTRO.js
#
### COMBINING (PRIVATE)
echo "- COMBINING ${NAME} API into ${TMP_FILE}"
> ${TMP_FILE}
#chmod 664 ${TMP_FILE}
cat ${COMBINE} > ${TMP_FILE}

#makeDocs

#
#> $DOC_FILE
#chmod 664 ${DOC_FILE}
#cp -r -p yuidoc.json ${SRC_DIR}
#
### Insert Framework/Layer Build information into source code
echo "- Inserting distribution, version and build time into ${TMP_FILE}"
sed -i -e "s/{DEVMODE}/${DEVMODE}/" -e "s/{NAME}/${NAME}/" -e "s/{VERSION}/${VERSION}/" -e "s/{DISTRO}/${DISTRO}/" -e "s/{TIMESTAMP}/${TIMESTAMP}/" -e "s/{VER_BOOTSTRAP}/${VER_BOOTSTRAP}/" -e "s/{VER_JQUERY}/${VER_JQUERY}/" -e "s/{VER_FONTAWESOME}/${VER_FONTAWESOME}/" -e "s/{VER_MODERNIZR}/${VER_MODERNIZR}/" -e "s/{VER_NANOFW}/${VER_NANOFW}/" ${TMP_FILE}
if [ "$2" == local ]; then
	cp -rfu ${TMP_FILE} ${OUT_FILE}
	cp -rfu ${OUT_FILE} ${LCL_NFW}/$VERSION/$OUT_FILE
	cp -rfu ${OUT_FILE} ${CDN_DIR}/$VERSION/$OUT_FILE
fi
#
### REMOVE ALL LINES OF CODE WITH "debug" 
if [ "$2" == release ]; then
	echo "- REMOVE ALL LINES OF CODE FOR DEBUGGING FROM ${TMP_FILE}"
	echo "- Removing any debug calls from ${TMP_FILE}"
	sed -i -e '/debug/Id' ${TMP_FILE} 
	#sed -i -e '/DEBUG/d' ${TMP_FILE} 
fi
#
### MINIMIZE -> COMPRESS
if [ "$2" != local ]; then
	echo "- Minimizing ${TMP_FILE} to ${OUT_FILE}..."
	java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js ${TMP_FILE} --js_output_file ${OUT_FILE}

	mkdir -p ${CDN_DIR}
	mkdir -p ${CDN_DIR}/$VERSION/
	cp -rfu ${OUT_FILE} ${CDN_DIR}/$VERSION/$OUT_FILE
	cp -rfu ${OUT_FILE} ${LCL_NFW}/$VERSION/$OUT_FILE
fi
echo "- Moving ${OUT_FILE} ${OUT_DST_PKG}"
mv ${OUT_FILE} ${OUT_DST_PKG}
#
### Move files to server
#echo "Transfering to Local Test Server."
#cp -rfu $GIT_DIR/cdn $TEST_DIR/
#ftp -inv $HOST << EOF
#user $USER $PASS
#cd $TEST_DIR
#lcd ../code/i2tm/js
#put $OUT_FILE
#bye
#EOF
#
### All Done
echo "Build Complete."
exit 0